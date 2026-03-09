import { Router } from "express";
import { getDb } from "../db";
import { sql } from "drizzle-orm";

const router = Router();

// Submeter formulário de recrutamento
router.post("/api/recruitment/submit", async (req, res) => {
  try {
    const {
      discordId,
      discordUsername,
      nome,
      idViceCity,
      telefone,
      idade,
      interesse,
      possuiMicrofone,
      regrasIlegais,
      ordemSuperior,
      tiroteio,
      multiplasOcorrencias,
    } = req.body;

    // Validações
    if (!discordId || !discordUsername || !nome || !idViceCity || !telefone || !idade) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    if (possuiMicrofone === "nao") {
      return res.status(400).json({ error: "É obrigatório possuir microfone" });
    }

    // Salvar no banco de dados
    const db = await getDb();
    if (!db) {
      return res.status(500).json({ error: "Banco de dados não disponível" });
    }

    // Criar usuário automaticamente na tabela users
    // Verificar se já existe um usuário com este Discord ID
    const existingUser = await db.execute(
      sql`SELECT id FROM users WHERE discordId = ${discordId} LIMIT 1`
    );

    let userId;
    const existingUserRows = existingUser[0] as unknown as any[];
    if (existingUserRows && existingUserRows.length > 0) {
      // Usuário já existe, usar ID existente
      userId = existingUserRows[0].id;
      console.log(`[Recruitment] Usuário já existe com Discord ID ${discordId}, ID: ${userId}`);
    } else {
      // Criar novo usuário
      console.log(`[Recruitment] Criando usuário com dados:`, {
        discordId,
        nome,
        idViceCity,
        rank: 'Soldado'
      });
      const newUserResult = await db.execute(
        sql`INSERT INTO users 
         (\`openId\`, \`name\`, \`discordId\`, \`studentId\`, \`rank\`, \`role\`, \`approvalStatus\`, \`createdAt\`, \`updatedAt\`, \`lastSignedIn\`)
         VALUES (${`discord_${discordId}`}, ${nome}, ${discordId}, ${idViceCity}, 'Soldado', 'member', 'pending', NOW(), NOW(), NOW())`
      );
      userId = Number(newUserResult[0].insertId);
      console.log(`[Recruitment] Novo usuário criado com Discord ID ${discordId}, ID: ${userId}`);
    }

    const result = await db.execute(
      sql`INSERT INTO recruitment_applications 
       (discord_id, discord_username, nome, id_vice_city, telefone, idade, 
        interesse, possui_microfone, regras_ilegais, ordem_superior, 
        tiroteio, multiplas_ocorrencias, status, created_at)
       VALUES (${discordId}, ${discordUsername}, ${nome}, ${idViceCity}, ${telefone}, ${idade}, 
               ${interesse}, ${possuiMicrofone}, ${regrasIlegais}, ${ordemSuperior}, 
               ${tiroteio}, ${multiplasOcorrencias}, 'pending', NOW())`
    );

    const applicationId = Number(result[0].insertId);

    // Enviar para canal do Discord
    const channelId = process.env.DISCORD_CHANNEL_ENROLLMENTS;
    if (!channelId) {
      console.error("DISCORD_CHANNEL_ENROLLMENTS não configurado");
      return res.status(500).json({ error: "Canal do Discord não configurado" });
    }

    // Enviar webhook para canal do Discord
    const webhookUrl = process.env.DISCORD_WEBHOOK_ENROLLMENTS;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            embeds: [
              {
                color: 0xdc2626,
                title: "📋 Nova Solicitação de Recrutamento",
                description: `**${nome}** enviou uma solicitação de recrutamento.`,
                fields: [
                  { name: "👤 Nome", value: nome, inline: true },
                  { name: "🆔 ID Pecado", value: idViceCity, inline: true },
                  { name: "📱 Telefone", value: telefone, inline: true },
                  { name: "🎂 Idade", value: idade, inline: true },
                  { name: "💬 Discord", value: `<@${discordId}>`, inline: true },
                  { name: "📝 Por que quer entrar?", value: interesse || "Não informado" },
                  { name: "🎤 Possui microfone?", value: possuiMicrofone === "sim" ? "✅ Sim" : "❌ Não", inline: true },
                  { name: "⚖️ Regras ilegais", value: regrasIlegais || "Não respondido" },
                  { name: "👮 Ordem superior", value: ordemSuperior || "Não respondido" },
                  { name: "🔫 Tiroteio", value: tiroteio || "Não respondido" },
                  { name: "🚨 Múltiplas ocorrências", value: multiplasOcorrencias || "Não respondido" },
                ],
                footer: { text: `ID da Aplicação: ${applicationId}` },
                timestamp: new Date().toISOString(),
              },
            ],
          }),
        });
      } catch (error) {
        console.error("Erro ao enviar webhook:", error);
      }
    }

    res.json({ success: true, applicationId });
  } catch (error) {
    console.error("Erro ao processar formulário de recrutamento:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
