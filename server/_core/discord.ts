import { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder, TextChannel } from "discord.js";
import * as db from "../db";
import { users, courseEvents } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_APPLICATION_ID = process.env.DISCORD_APPLICATION_ID;
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;
const DISCORD_CHANNEL_ENROLLMENTS = process.env.DISCORD_CHANNEL_ENROLLMENTS;
const DISCORD_CHANNEL_EVENTS = process.env.DISCORD_CHANNEL_EVENTS;
const DISCORD_CHANNEL_CERTIFICATES = process.env.DISCORD_CHANNEL_CERTIFICATES;

let client: Client | null = null;

export async function initDiscordBot() {
  if (!DISCORD_BOT_TOKEN) {
    console.log("[Discord] Bot token not configured, skipping initialization");
    return null;
  }

  // Se o bot já está inicializado, retornar a instância existente
  if (client) {
    console.log("[Discord] Bot already initialized, reusing existing instance");
    return client;
  }

  try {
    client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });

    client.on("ready", () => {
      console.log(`[Discord] Bot logged in as ${client?.user?.tag}`);
    });

    // Register slash commands
    await registerCommands();

    // Handle slash commands
    client.on("interactionCreate", async (interaction) => {
      if (interaction.isChatInputCommand()) {
        await handleCommand(interaction);
      } else if (interaction.isButton()) {
        await handleButtonInteraction(interaction);
      }
    });

    await client.login(DISCORD_BOT_TOKEN);
    return client;
  } catch (error) {
    console.error("[Discord] Failed to initialize bot:", error);
    return null;
  }
}

async function registerCommands() {
  if (!DISCORD_APPLICATION_ID || !DISCORD_SERVER_ID || !DISCORD_BOT_TOKEN) {
    console.log("[Discord] Missing credentials for command registration");
    return;
  }

  const commands = [
    new SlashCommandBuilder()
      .setName("cursos")
      .setDescription("Lista todos os cursos disponíveis"),
    
    new SlashCommandBuilder()
      .setName("inscrever")
      .setDescription("Inscrever-se em um evento/curso")
      .addIntegerOption(option =>
        option
          .setName("evento_id")
          .setDescription("ID do evento para se inscrever")
          .setRequired(true)
      ),
    
    new SlashCommandBuilder()
      .setName("agenda")
      .setDescription("Ver próximos eventos agendados"),
    
    new SlashCommandBuilder()
      .setName("meusstatus")
      .setDescription("Ver status das suas inscrições"),
    
    new SlashCommandBuilder()
      .setName("meuscertificados")
      .setDescription("Ver todos os seus certificados emitidos"),
    
    new SlashCommandBuilder()
      .setName("solicitar_set")
      .setDescription("Solicitar configuração inicial no servidor (cargo, nickname, etc)"),
    
    new SlashCommandBuilder()
      .setName("ranking")
      .setDescription("Ver ranking de instrutores por cursos aplicados")
      .addStringOption(option =>
        option
          .setName("data_inicial")
          .setDescription("Data inicial no formato DD/MM/AAAA")
          .setRequired(true)
      )
      .addStringOption(option =>
        option
          .setName("data_final")
          .setDescription("Data final no formato DD/MM/AAAA")
          .setRequired(true)
      ),
    
    new SlashCommandBuilder()
      .setName("ajuda")
      .setDescription("Exibir lista de comandos disponíveis"),
    
    new SlashCommandBuilder()
      .setName("emitircertificado")
      .setDescription("[INSTRUTOR] Emitir certificado para um aluno")
      .addIntegerOption(option =>
        option
          .setName("agendamento_id")
          .setDescription("ID do agendamento")
          .setRequired(true)
      )
      .addStringOption(option =>
        option
          .setName("matricula")
          .setDescription("Matrícula do aluno")
          .setRequired(true)
      ),
    
    new SlashCommandBuilder()
      .setName("lembrete")
      .setDescription("[INSTRUTOR] Enviar lembrete de evento aos inscritos")
      .addIntegerOption(option =>
        option
          .setName("evento_id")
          .setDescription("ID do evento")
          .setRequired(true)
      )
      .addStringOption(option =>
        option
          .setName("mensagem")
          .setDescription("Mensagem do lembrete")
          .setRequired(true)
      ),
    
    new SlashCommandBuilder()
      .setName("avisar")
      .setDescription("[INSTRUTOR] Enviar aviso geral no canal de eventos")
      .addStringOption(option =>
        option
          .setName("mensagem")
          .setDescription("Mensagem do aviso")
          .setRequired(true)
      ),
  ].map(command => command.toJSON());

  const rest = new REST({ version: "10" }).setToken(DISCORD_BOT_TOKEN);

  try {
    console.log("[Discord] Registering slash commands...");
    await rest.put(
      Routes.applicationGuildCommands(DISCORD_APPLICATION_ID, DISCORD_SERVER_ID),
      { body: commands }
    );
    console.log("[Discord] Slash commands registered successfully");
  } catch (error) {
    console.error("[Discord] Failed to register commands:", error);
  }
}

async function handleCommand(interaction: ChatInputCommandInteraction) {
  const { commandName } = interaction;
  const startTime = Date.now();
  console.log(`[Discord] Handling command: ${commandName} | Interaction ID: ${interaction.id} | Replied: ${interaction.replied}`);

  try {
    switch (commandName) {
      case "cursos":
        // Buscar cursos do banco de dados
        const courses = await db.getAllCourses();
        if (courses.length === 0) {
          await interaction.reply("📚 **Cursos Disponíveis**\n\nNenhum curso cadastrado no momento.");
        } else {
          const courseList = courses.map((c, idx) => `${idx + 1}. **${c.nome}** - ${c.valor || "Valor a consultar"}`).join("\n");
          await interaction.reply(`📚 **Cursos Disponíveis**\n\n${courseList}\n\nPara mais detalhes, acesse: https://cbm-vice-city.manus.space`);
        }
        break;
      
      case "inscrever":
        const eventoId = interaction.options.getInteger("evento_id", true);
        
        // Buscar usuário pelo Discord ID
        const dbInstance = await db.getDb();
        if (!dbInstance) {
          await interaction.reply("❌ Erro ao conectar com o banco de dados. Tente novamente mais tarde.");
          break;
        }

        const userResults = await dbInstance.select().from(users).where(eq(users.discordId, interaction.user.id));
        const user = userResults[0];

        if (!user) {
          await interaction.reply("❌ Você precisa vincular sua conta Discord ao site primeiro. Acesse: https://cbm-vice-city.manus.space e faça login com Discord.");
          break;
        }

        // Verificar se evento existe
        const event = await db.getCourseEventById(eventoId);
        if (!event) {
          await interaction.reply(`❌ Evento ID ${eventoId} não encontrado.`);
          break;
        }

        // Verificar se já está inscrito
        const existing = await db.getUserEnrollmentForEvent(user.id, eventoId);
        if (existing && existing.status !== "cancelled") {
          await interaction.reply(`⚠️ Você já está inscrito neste evento. Status: **${existing.status}**`);
          break;
        }

        // Criar inscrição
        if (existing && existing.status === "cancelled") {
          await db.updateEnrollmentStatus(existing.id, "pending");
          await interaction.reply(`✅ Inscrição reativada para o evento ID ${eventoId}! Aguarde aprovação do instrutor.`);
        } else {
          await db.createEnrollment({
            userId: user.id,
            eventId: eventoId,
            status: "pending",
          });
          await interaction.reply(`✅ Inscrição realizada com sucesso para o evento ID ${eventoId}! Aguarde aprovação do instrutor.`);
        }
        break;
      
      case "agenda":
        // Defer reply para evitar timeout
        await interaction.deferReply();
        
        // Buscar próximos eventos
        const now = new Date();
        const futureDate = new Date();
        futureDate.setMonth(futureDate.getMonth() + 1);
        const events = await db.getCourseEventsByDateRange(now, futureDate);
        
        if (events.length === 0) {
          await interaction.editReply("📅 **Próximos Eventos**\n\nNenhum evento agendado para o próximo mês.");
        } else {
          // Converter UTC para horário de Brasília
          const { formatInTimeZone } = await import("date-fns-tz");
          const brasiliaTimezone = "America/Sao_Paulo";

          const eventList = events.slice(0, 5).map((e, idx) => {
            const dateStr = formatInTimeZone(new Date(e.startDate), brasiliaTimezone, "dd/MM/yyyy");
            const timeStr = formatInTimeZone(new Date(e.startDate), brasiliaTimezone, "HH:mm");
            return `${idx + 1}. **${e.title}** - ${dateStr} às ${timeStr} (ID: ${e.id})`;
          }).join("\n");
          await interaction.editReply(`📅 **Próximos Eventos**\n\n${eventList}\n\nPara se inscrever, use: \`/inscrever <evento_id>\`\nAgenda completa: https://cbm-vice-city.manus.space/agendamento`);
        }
        break;
      
      case "meusstatus":
        // Buscar usuário pelo Discord ID
        const dbInst = await db.getDb();
        if (!dbInst) {
          await interaction.reply("❌ Erro ao conectar com o banco de dados.");
          break;
        }

        const userRes = await dbInst.select().from(users).where(eq(users.discordId, interaction.user.id));
        const currentUser = userRes[0];

        if (!currentUser) {
          await interaction.reply("❌ Você precisa vincular sua conta Discord ao site primeiro. Acesse: https://cbm-vice-city.manus.space");
          break;
        }

        // Buscar inscrições do usuário
        const { courseEnrollments } = await import("../../drizzle/schema");
        const enrollments = await dbInst.select().from(courseEnrollments).where(eq(courseEnrollments.userId, currentUser.id));
        
        if (enrollments.length === 0) {
          await interaction.reply("📊 **Suas Inscrições**\n\nVocê ainda não tem inscrições.");
        } else {
          const statusList = await Promise.all(enrollments.slice(0, 5).map(async (enr) => {
            const evt = await db.getCourseEventById(enr.eventId);
            const statusEmoji = enr.status === "confirmed" ? "✅" : enr.status === "pending" ? "⏳" : enr.status === "rejected" ? "❌" : "🚫";
            return `${statusEmoji} **${evt?.title || "Evento"}** - ${enr.status}`;
          }));
          await interaction.reply(`📊 **Suas Inscrições**\n\n${statusList.join("\n")}\n\nDetalhes completos: https://cbm-vice-city.manus.space/agendamento`);
        }
        break;
      
      case "meuscertificados":
        try {
          // Verificar se a interação já foi respondida
          console.log(`[Discord] /meuscertificados - Status: replied=${interaction.replied}, deferred=${interaction.deferred}`);
          
          // Defer a resposta para evitar timeout (apenas se ainda não foi respondida)
          if (!interaction.replied && !interaction.deferred) {
            await interaction.deferReply();
          }
          
          // Capturar nickname do servidor Discord
          const member = interaction.member;
          if (!member) {
            await interaction.editReply("❌ Não foi possível identificar você no servidor.");
            break;
          }
          
          // Buscar membro do servidor para obter nickname
          const guild = interaction.guild;
          if (!guild) {
            await interaction.editReply("❌ Este comando só pode ser usado dentro do servidor.");
            break;
          }
          
          const guildMember = await guild.members.fetch(interaction.user.id);
          const nickname = guildMember.nickname || interaction.user.username;
          
          console.log(`[Discord] /meuscertificados - Nickname capturado: "${nickname}"`);
          
          // Extrair matrícula do nickname (formato: Cargo | Nome | Matrícula ou Cargo • Nome | Matrícula)
          // A matrícula está após o último | ou •
          const parts = nickname.split(/[|•]/).map((p: string) => p.trim());
          
          console.log(`[Discord] /meuscertificados - Parts extraídas:`, parts);
          
          if (parts.length < 2) {
            await interaction.editReply(
              `❌ Seu nickname não está no formato correto.\n\n` +
              `Nickname atual: \`${nickname}\`\n` +
              `Formato esperado: \`Cargo | Nome | Matrícula\` ou \`Cargo • Nome | Matrícula\``
            );
            break;
          }
          
          const matricula = parts[parts.length - 1].trim();
          
          console.log(`[Discord] /meuscertificados - Matrícula extraída: "${matricula}"`);
          
          if (!matricula) {
            await interaction.editReply("❌ Não foi possível extrair sua matrícula do nickname. Verifique se seu nickname está no formato correto.");
            break;
          }
          
          // Buscar certificados por studentId (matrícula)
          const dbCerts = await db.getDb();
          if (!dbCerts) {
            await interaction.editReply("❌ Erro ao conectar com o banco de dados.");
            break;
          }
          
          const { certificates: certsTable } = await import("../../drizzle/schema");
          const userCerts = await dbCerts.select().from(certsTable).where(eq(certsTable.studentId, matricula));
          
          console.log(`[Discord] /meuscertificados - Certificados encontrados: ${userCerts.length}`);
          if (userCerts.length > 0) {
            console.log(`[Discord] /meuscertificados - Primeiro certificado:`, {
              courseName: userCerts[0].courseName,
              studentId: userCerts[0].studentId,
              studentName: userCerts[0].studentName
            });
          }
          
          if (userCerts.length === 0) {
            await interaction.editReply(
              `🎓 **Seus Certificados**\n\n` +
              `Você ainda não possui certificados emitidos.\n\n` +
              `Quando você concluir um curso, seu certificado aparecerá aqui!`
            );
            break;
          }
          
          // Formatar lista de certificados (texto simples, sem embed)
          const certList = userCerts.map(cert => {
            const issuedDate = new Date(cert.issuedAt).toLocaleDateString("pt-BR");
            return `• **${cert.courseName}**\n  Instrutor: ${cert.instructorRank} ${cert.instructorName}\n  Data: ${issuedDate}`;
          }).join("\n\n");
          
          const message = 
            `🎓 **Seus Certificados**\n\n` +
            `Você possui **${userCerts.length}** certificado(s):\n\n` +
            `${certList}`;
          
          // Discord tem limite de 2000 caracteres por mensagem
          if (message.length > 2000) {
            // Se a mensagem for muito longa, limitar a 10 certificados mais recentes
            const recentCerts = userCerts
              .sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime())
              .slice(0, 10);
            
            const limitedCertList = recentCerts.map(cert => {
              const issuedDate = new Date(cert.issuedAt).toLocaleDateString("pt-BR");
              return `• **${cert.courseName}**\n  Instrutor: ${cert.instructorRank} ${cert.instructorName}\n  Data: ${issuedDate}`;
            }).join("\n\n");
            
            await interaction.editReply(
              `🎓 **Seus Certificados**\n\n` +
              `Você possui **${userCerts.length}** certificado(s). Mostrando os 10 mais recentes:\n\n` +
              `${limitedCertList}`
            );
          } else {
            await interaction.editReply(message);
          }
        } catch (error) {
          console.error("[Discord] Error in meuscertificados command:", error);
          // Não tentar responder novamente se a interação já foi reconhecida
          if (!interaction.replied && !interaction.deferred) {
            try {
              await interaction.editReply("❌ Erro ao buscar certificados. Tente novamente.");
            } catch (replyError) {
              console.error("[Discord] Failed to send error message:", replyError);
            }
          }
        }
        break;
      
      case "ranking":
        // Defer reply porque este comando pode demorar
        await interaction.deferReply();
        
        try {
          // Obter parâmetros de data
          const dataInicialStr = interaction.options.getString("data_inicial", true);
          const dataFinalStr = interaction.options.getString("data_final", true);
          
          // Validar formato DD/MM/AAAA
          const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
          const matchInicial = dataInicialStr.match(dateRegex);
          const matchFinal = dataFinalStr.match(dateRegex);
          
          if (!matchInicial || !matchFinal) {
            await interaction.editReply("❌ Formato de data inválido. Use DD/MM/AAAA (exemplo: 01/01/2024)");
            break;
          }
          
          // Converter para Date em UTC-3 (Brasília)
          const [, diaIni, mesIni, anoIni] = matchInicial;
          const [, diaFim, mesFim, anoFim] = matchFinal;
          
          // Criar datas no início e fim do dia em UTC-3
          const dataInicial = new Date(`${anoIni}-${mesIni}-${diaIni}T00:00:00-03:00`);
          const dataFinal = new Date(`${anoFim}-${mesFim}-${diaFim}T23:59:59-03:00`);
          
          if (isNaN(dataInicial.getTime()) || isNaN(dataFinal.getTime())) {
            await interaction.editReply("❌ Data inválida. Verifique os valores informados.");
            break;
          }
          
          if (dataInicial > dataFinal) {
            await interaction.editReply("❌ Data inicial deve ser anterior à data final.");
            break;
          }
          
          // Buscar certificados no período
          const dbRanking = await db.getDb();
          if (!dbRanking) {
            await interaction.editReply("❌ Erro ao conectar com o banco de dados.");
            break;
          }
          
          const { certificates: certsTable } = await import("../../drizzle/schema");
          const { gte, lte, and } = await import("drizzle-orm");
          
          const certificatesInPeriod = await dbRanking
            .select()
            .from(certsTable)
            .where(
              and(
                gte(certsTable.issuedAt, dataInicial),
                lte(certsTable.issuedAt, dataFinal)
              )
            );
          
          if (certificatesInPeriod.length === 0) {
            await interaction.editReply(
              `🏆 **RANKING DE INSTRUTORES**\n` +
              `Período: ${dataInicialStr} - ${dataFinalStr}\n\n` +
              `Nenhum certificado emitido neste período.`
            );
            break;
          }
          
          // Agrupar certificados por instrutor e curso, ordenados por data
          interface CertGroup {
            instructorName: string;
            instructorRank: string;
            courseName: string;
            issuedAt: Date;
          }
          
          const certsByInstructor = new Map<string, CertGroup[]>();
          
          certificatesInPeriod.forEach(cert => {
            if (cert.instructorName && cert.courseName) {
              const key = cert.instructorName;
              if (!certsByInstructor.has(key)) {
                certsByInstructor.set(key, []);
              }
              certsByInstructor.get(key)!.push({
                instructorName: cert.instructorName,
                instructorRank: cert.instructorRank || "N/A",
                courseName: cert.courseName,
                issuedAt: new Date(cert.issuedAt)
              });
            }
          });
          
          // Contar cursos aplicados usando janela de 20 minutos
          const instructorCounts = new Map<string, { name: string; rank: string; count: number }>();
          
          certsByInstructor.forEach((certs, instructorName) => {
            // Ordenar por data
            certs.sort((a, b) => a.issuedAt.getTime() - b.issuedAt.getTime());
            
            let coursesApplied = 0;
            let lastCourseEnd: Date | null = null;
            let lastCourseName: string | null = null;
            
            certs.forEach(cert => {
              // Se é o primeiro certificado ou:
              // - Curso diferente, OU
              // - Mesmo curso mas intervalo > 20 minutos
              if (!lastCourseEnd || 
                  cert.courseName !== lastCourseName ||
                  (cert.issuedAt.getTime() - lastCourseEnd.getTime()) > 20 * 60 * 1000) {
                coursesApplied++;
                lastCourseName = cert.courseName;
              }
              lastCourseEnd = cert.issuedAt;
            });
            
            instructorCounts.set(instructorName, {
              name: instructorName,
              rank: certs[0].instructorRank,
              count: coursesApplied
            });
          });
          
          // Ordenar por quantidade de cursos aplicados
          const topInstructors = Array.from(instructorCounts.values())
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);
          
          // Formatar resposta
          const rankingList = topInstructors.map((inst, idx) => {
            const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`;
            return `${medal} ${inst.rank} ${inst.name} - ${inst.count} curso${inst.count > 1 ? 's' : ''} aplicado${inst.count > 1 ? 's' : ''}`;
          }).join("\n");
          
          await interaction.editReply(
            `🏆 **RANKING DE INSTRUTORES**\n` +
            `Período: ${dataInicialStr} - ${dataFinalStr}\n\n` +
            `${rankingList}`
          );
        } catch (error) {
          console.error("[Discord] Error in ranking command:", error);
          await interaction.editReply("❌ Erro ao processar ranking. Tente novamente.");
        }
        break;
      
      case "ajuda":
        const helpText = `📚 **Comandos Disponíveis**\n\n` +
          `**Comandos Gerais:**\n` +
          `• \`/cursos\` - Lista todos os cursos disponíveis\n` +
          `• \`/agenda\` - Ver próximos eventos agendados\n` +
          `• \`/inscrever <evento_id>\` - Inscrever-se em um evento\n` +
          `• \`/meusstatus\` - Ver status das suas inscrições\n` +
          `• \`/meuscertificados\` - Ver seus certificados emitidos\n` +
          `• \`/ranking <data_inicial> <data_final>\` - Ver ranking de instrutores\n` +
          `• \`/ajuda\` - Exibir esta mensagem\n\n` +
          `**Comandos de Instrutor:**\n` +
          `• \`/emitircertificado\` - Emitir certificado para um aluno\n` +
          `• \`/lembrete\` - Enviar lembrete aos inscritos\n` +
          `• \`/avisar\` - Enviar aviso geral\n\n` +
          `**Site:** https://cbm-vice-city.manus.space`;
        await interaction.reply(helpText);
        break;
      
      case "emitircertificado":
        // Verificar se é instrutor (implementar verificação de permissão)
        await interaction.reply("⚠️ Este comando deve ser usado através do site: https://cbm-vice-city.manus.space/agendamento\n\nAcesse a página de agendamentos e clique em 'Emitir Certificado' para o aluno aprovado.");
        break;
      
      case "lembrete":
        await interaction.reply("⚠️ Este comando deve ser usado através do site: https://cbm-vice-city.manus.space/gerenciar-usuarios\n\nAcesse a página de gerenciamento para enviar lembretes.");
        break;
      
      case "solicitar_set":
        try {
          const siteUrl = process.env.SITE_URL || "https://cbmlotus-mpf46nad.manus.space";
          const formUrl = `${siteUrl}/recrutamento?discord_id=${interaction.user.id}&discord_username=${encodeURIComponent(interaction.user.username)}`;
          
          await interaction.reply({
            content: `📝 **Solicitação de Configuração Inicial**\n\nPara configurar seu cargo, nickname e matrícula no servidor, preencha o formulário de recrutamento:\n\n🔗 ${formUrl}\n\n⚠️ **Importante:**\n• Preencha todas as perguntas com atenção\n• Seu formulário será avaliado por um recrutador\n• Após aprovação, suas configurações serão aplicadas automaticamente`,
            ephemeral: true, // Mensagem visível apenas para o usuário
          });
        } catch (error) {
          console.error("[Discord] Erro no comando /solicitar_set:", error);
          await interaction.reply({
            content: "❌ Erro ao gerar link do formulário. Tente novamente mais tarde.",
            ephemeral: true,
          });
        }
        break;
      
      case "avisar":
        await interaction.reply("⚠️ Este comando deve ser usado através do site: https://cbm-vice-city.manus.space/gerenciar-usuarios\n\nAcesse a página de gerenciamento para enviar avisos.");
        break;
      
      default:
        await interaction.reply("❌ Comando não reconhecido. Use `/ajuda` para ver comandos disponíveis.");
    }
  } catch (error) {
    console.error("[Discord] Error handling command:", error);
    // Verificar se a interação já foi respondida antes de tentar responder
    if (!interaction.replied && !interaction.deferred) {
      try {
        await interaction.reply("❌ Erro ao processar comando. Tente novamente mais tarde.");
      } catch (replyError) {
        console.error("[Discord] Failed to send error message:", replyError);
      }
    }
  }
}

// Funções para enviar notificações do Site → Discord

export async function sendEnrollmentNotification(data: {
  userName: string;
  userStudentId: string;
  courseName: string;
  eventDate: string;
  eventTime: string;
}) {
  if (!client || !DISCORD_CHANNEL_ENROLLMENTS) return false;

  try {
    const channel = await client.channels.fetch(DISCORD_CHANNEL_ENROLLMENTS) as TextChannel;
    
    const embed = new EmbedBuilder()
      .setColor(0xb91c1c)
      .setTitle("🎓 Nova Inscrição em Curso")
      .addFields(
        { name: "Aluno", value: `${data.userName} | ID: ${data.userStudentId}`, inline: true },
        { name: "Curso", value: data.courseName, inline: true },
        { name: "Data", value: data.eventDate, inline: true },
        { name: "Horário", value: data.eventTime, inline: true },
        { name: "Status", value: "⏳ Pendente de Aprovação", inline: false }
      )
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    console.log("[Discord] Enrollment notification sent");
    return true;
  } catch (error) {
    console.error("[Discord] Failed to send enrollment notification:", error);
    return false;
  }
}

export async function sendApprovalNotification(data: {
  userName: string;
  userStudentId: string;
  courseName: string;
  eventDate: string;
  eventTime: string;
  status: "confirmed" | "rejected";
}) {
  if (!client || !DISCORD_CHANNEL_ENROLLMENTS) return false;

  try {
    const channel = await client.channels.fetch(DISCORD_CHANNEL_ENROLLMENTS) as TextChannel;
    
    const isApproved = data.status === "confirmed";
    const embed = new EmbedBuilder()
      .setColor(isApproved ? 0x22c55e : 0xef4444)
      .setTitle(isApproved ? "✅ Inscrição Aprovada" : "❌ Inscrição Rejeitada")
      .addFields(
        { name: "Aluno", value: `${data.userName} | ID: ${data.userStudentId}`, inline: true },
        { name: "Curso", value: data.courseName, inline: true },
        { name: "Data", value: data.eventDate, inline: true },
        { name: "Horário", value: data.eventTime, inline: true },
        { name: "Status", value: isApproved ? "✅ Confirmado" : "❌ Rejeitado", inline: false }
      )
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    console.log("[Discord] Approval notification sent");
    return true;
  } catch (error) {
    console.error("[Discord] Failed to send approval notification:", error);
    return false;
  }
}

export async function sendEventNotification(data: {
  courseName: string;
  eventDate: string;
  eventTime: string;
  location: string;
  instructorName: string;
}) {
  if (!client || !DISCORD_CHANNEL_EVENTS) return false;

  try {
    const channel = await client.channels.fetch(DISCORD_CHANNEL_EVENTS) as TextChannel;
    
    const embed = new EmbedBuilder()
      .setColor(0xb91c1c)
      .setTitle("📅 Novo Evento Agendado")
      .addFields(
        { name: "Curso", value: data.courseName, inline: false },
        { name: "Data", value: data.eventDate, inline: true },
        { name: "Horário", value: data.eventTime, inline: true },
        { name: "Local", value: data.location, inline: true },
        { name: "Instrutor", value: data.instructorName, inline: false }
      )
      .setFooter({ text: "Faça sua inscrição pelo site ou use /inscrever <evento_id>" })
      .setTimestamp();

    await channel.send({ embeds: [embed] });
    console.log("[Discord] Event notification sent");
    return true;
  } catch (error) {
    console.error("[Discord] Failed to send event notification:", error);
    return false;
  }
}

export async function sendCertificateNotification(data: {
  userName: string;
  userStudentId: string;
  courseName: string;
  imageBuffer?: Buffer; // Buffer da imagem PNG do certificado (deprecated)
  certificateUrl?: string; // URL da imagem do certificado no S3
}) {
  if (!client) {
    console.error("[Discord] Bot client not initialized");
    return false;
  }
  
  if (!DISCORD_CHANNEL_CERTIFICATES) {
    console.error("[Discord] DISCORD_CHANNEL_CERTIFICATES not configured");
    return false;
  }
  
  if (!client.isReady()) {
    console.log("[Discord] Bot client is not ready yet, waiting...");
    // Aguardar até 30 segundos para o bot ficar pronto
    const maxWaitTime = 30000; // 30 segundos
    const startTime = Date.now();
    
    while (!client.isReady() && (Date.now() - startTime) < maxWaitTime) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Aguardar 500ms
    }
    
    if (!client.isReady()) {
      console.error("[Discord] Bot client is still not ready after waiting");
      return false;
    }
    
    console.log("[Discord] Bot client is now ready");
  }

  try {
    const channel = await client.channels.fetch(DISCORD_CHANNEL_CERTIFICATES) as TextChannel;
    
    const embed = new EmbedBuilder()
      .setColor(0xfbbf24)
      .setTitle("🎖️ Certificado Emitido")
      .addFields(
        { name: "Aluno", value: `${data.userName} | ID: ${data.userStudentId}`, inline: true },
        { name: "Curso", value: data.courseName, inline: true }
      )
      .setFooter({ text: "Parabéns pela conclusão do curso!" })
      .setTimestamp();

    // Se houver imagem, anexar ao Discord
    const messagePayload: any = { embeds: [embed] };
    
    // Priorizar certificateUrl (S3) sobre imageBuffer
    if (data.certificateUrl) {
      console.log("[Discord] Using certificate URL from S3:", data.certificateUrl);
      embed.setImage(data.certificateUrl);
      console.log("[Discord] Certificate URL added to embed");
    } else if (data.imageBuffer) {
      console.log("[Discord] Preparing certificate image attachment from buffer");
      console.log("[Discord] Buffer size:", data.imageBuffer.length, "bytes");
      console.log("[Discord] Buffer type:", typeof data.imageBuffer);
      console.log("[Discord] Is Buffer:", Buffer.isBuffer(data.imageBuffer));
      
      const timestamp = Date.now();
      const fileName = `certificado-${data.userName.replace(/\s+/g, "-")}-${data.userStudentId}-${timestamp}.png`;
      console.log("[Discord] File name:", fileName);
      
      const { AttachmentBuilder } = await import("discord.js");
      const attachment = new AttachmentBuilder(data.imageBuffer, { name: fileName });
      messagePayload.files = [attachment];
      
      // Adicionar imagem ao embed
      embed.setImage(`attachment://${fileName}`);
      console.log("[Discord] Attachment created and added to message payload");
    } else {
      console.log("[Discord] No image buffer or URL provided");
    }

    await channel.send(messagePayload);
    console.log("[Discord] Certificate notification sent", data.certificateUrl || data.imageBuffer ? "with image" : "without image");
    return true;
  } catch (error) {
    console.error("[Discord] Failed to send certificate notification:", error);
    return false;
  }
}

async function handleButtonInteraction(interaction: any) {
  const customId = interaction.customId;
  console.log(`[Discord] Button interaction: ${customId}`);

  try {
    // Responder imediatamente para evitar timeout
    if (!interaction.deferred && !interaction.replied) {
      await interaction.deferReply({ ephemeral: true });
    }

    // Verificar se é botão de aprovação/reprovação de recrutamento
    if (customId.startsWith("approve_recruitment_")) {
      await handleRecruitmentApproval(interaction, customId);
    } else if (customId.startsWith("reject_recruitment_")) {
      await handleRecruitmentRejection(interaction, customId);
    }
  } catch (error) {
    console.error("[Discord] Error handling button interaction:", error);
    try {
      if (interaction.deferred) {
        await interaction.editReply("❌ Erro ao processar ação.");
      } else if (!interaction.replied) {
        await interaction.reply({ content: "❌ Erro ao processar ação.", ephemeral: true });
      }
    } catch (replyError) {
      console.error("[Discord] Failed to send error message:", replyError);
    }
  }
}

async function handleRecruitmentApproval(interaction: any, customId: string) {
  const applicationId = parseInt(customId.replace("approve_recruitment_", ""));

  try {
    // Buscar dados da aplicação no banco
    const dbInstance = await db.getDb();
    if (!dbInstance) {
      await interaction.editReply("❌ Erro ao conectar com o banco de dados.");
      return;
    }

    const { sql } = await import("drizzle-orm");
    const applications = await dbInstance.execute(
      sql`SELECT * FROM recruitment_applications WHERE id = ${applicationId}`
    );

    if (!applications || (applications as any[]).length === 0) {
      await interaction.editReply("❌ Aplicação não encontrada.");
      return;
    }

    const application = applications[0] as any;

    // Atualizar status no banco
    await dbInstance.execute(
      sql`UPDATE recruitment_applications SET status = 'approved' WHERE id = ${applicationId}`
    );

    // Buscar membro no servidor Discord
    const guild = await client?.guilds.fetch(DISCORD_SERVER_ID!);
    if (!guild) {
      await interaction.editReply("❌ Servidor Discord não encontrado.");
      return;
    }

    const member = await guild.members.fetch(application.discord_id);
    if (!member) {
      await interaction.editReply("❌ Membro não encontrado no servidor.");
      return;
    }

    // Atribuir roles: Soldado (1472645309040431296) e Bombeiro | Praça (1472689134081540116)
    const soldadoRoleId = "1472645309040431296";
    const bombeiroRoleId = "1472689134081540116";

    await member.roles.add([soldadoRoleId, bombeiroRoleId]);

    // Mudar nickname para formato: SD | Nome | Matrícula
    const newNickname = `SD | ${application.nome} | ${application.id_vice_city}`;
    await member.setNickname(newNickname);

    // Enviar para canal de aprovados
    const approvedWebhook = process.env.DISCORD_WEBHOOK_APPROVED;
    if (approvedWebhook) {
      await fetch(approvedWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              color: 0x00ff00,
              title: "✅ Recrutamento Aprovado",
              description: `**${application.nome}** foi aprovado no recrutamento!`,
              fields: [
                { name: "👤 Nome", value: application.nome, inline: true },
                { name: "🆔 ID Vice City", value: application.id_vice_city, inline: true },
                { name: "💬 Discord", value: `<@${application.discord_id}>`, inline: true },
                { name: "🎯 Cargo Atribuído", value: "Soldado", inline: true },
                { name: "📝 Nickname", value: newNickname, inline: true },
              ],
              footer: { text: `Aprovado por ${interaction.user.tag}` },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    }

    // Desabilitar botões da mensagem original
    await interaction.message.edit({
      components: [],
    });

    await interaction.editReply("✅ Recrutamento aprovado com sucesso! Cargos atribuídos e nickname alterado.");
  } catch (error) {
    console.error("[Discord] Error approving recruitment:", error);
    await interaction.editReply("❌ Erro ao aprovar recrutamento.");
  }
}

async function handleRecruitmentRejection(interaction: any, customId: string) {
  const applicationId = parseInt(customId.replace("reject_recruitment_", ""));

  try {
    // Buscar dados da aplicação no banco
    const dbInstance = await db.getDb();
    if (!dbInstance) {
      await interaction.editReply("❌ Erro ao conectar com o banco de dados.");
      return;
    }

    const { sql } = await import("drizzle-orm");
    const applications = await dbInstance.execute(
      sql`SELECT * FROM recruitment_applications WHERE id = ${applicationId}`
    );

    if (!applications || (applications as any[]).length === 0) {
      await interaction.editReply("❌ Aplicação não encontrada.");
      return;
    }

    const application = applications[0] as any;

    // Atualizar status no banco
    await dbInstance.execute(
      sql`UPDATE recruitment_applications SET status = 'rejected' WHERE id = ${applicationId}`
    );

    // Enviar para canal de reprovados
    const rejectedWebhook = process.env.DISCORD_WEBHOOK_REJECTED;
    if (rejectedWebhook) {
      await fetch(rejectedWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              color: 0xff0000,
              title: "❌ Recrutamento Reprovado",
              description: `**${application.nome}** foi reprovado no recrutamento.`,
              fields: [
                { name: "👤 Nome", value: application.nome, inline: true },
                { name: "🆔 ID Vice City", value: application.id_vice_city, inline: true },
                { name: "💬 Discord", value: `<@${application.discord_id}>`, inline: true },
              ],
              footer: { text: `Reprovado por ${interaction.user.tag}` },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    }

    // Desabilitar botões da mensagem original
    await interaction.message.edit({
      components: [],
    });

    await interaction.editReply("✅ Recrutamento reprovado. Candidato não recebeu cargos.");
  } catch (error) {
    console.error("[Discord] Error rejecting recruitment:", error);
    await interaction.editReply("❌ Erro ao reprovar recrutamento.");
  }
}

export function getDiscordClient() {
  return client;
}
