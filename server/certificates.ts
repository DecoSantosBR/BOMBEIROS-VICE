import { ENV } from './_core/env';
import { storagePut } from './storage';

/**
 * Interface para dados do certificado
 */
export interface CertificateData {
  studentName: string;
  studentId: string; // Matrícula
  courseName: string;
  instructorName: string;
  instructorRank: string;
  auxiliar?: string; // Nome do auxiliar (opcional)
  ID_auxiliar?: string; // Matrícula do auxiliar (opcional)
  issuedAt: Date;
}

/**
 * Gera imagem do certificado usando HTML Canvas
 * Design idêntico ao modelo oficial do 1º CBM Lotus
 * Retorna buffer da imagem PNG
 */
export async function generateCertificateImage(data: CertificateData): Promise<Buffer> {
  const { createCanvas, loadImage } = await import('canvas');
  
  // Dimensões do certificado (1200x680 pixels)
  const width = 1200;
  const height = 680;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Cores do design
  const darkRed = '#8B1A1A'; // Vermelho escuro
  const lightBeige = '#F5E6D3'; // Bege claro
  const borderRed = '#A52A2A'; // Vermelho da borda
  
  // 1. FUNDO BEGE CLARO
  ctx.fillStyle = lightBeige;
  ctx.fillRect(0, 0, width, height);
  
  // 2. BORDA VERMELHA EXTERNA (arredondada)
  ctx.strokeStyle = borderRed;
  ctx.lineWidth = 16;
  ctx.beginPath();
  ctx.roundRect(8, 8, width - 16, height - 16, 20);
  ctx.stroke();
  
  // 3. BORDA INTERNA BEGE (cria efeito de moldura dupla)
  ctx.strokeStyle = '#D4AF37'; // Dourado
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(24, 24, width - 48, height - 48, 15);
  ctx.stroke();
  
  // 4. LOGO DO CBM LOTUS NO CANTO SUPERIOR ESQUERDO
  try {
    const { fileURLToPath } = await import('url');
    const { dirname, join } = await import('path');
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const logoPath = join(__dirname, 'assets', 'cbm-lotus-logo.png');
    const logo = await loadImage(logoPath);
    // Desenhar logo com tamanho proporcional (100x100 pixels)
    ctx.drawImage(logo, 50, 50, 100, 100);
  } catch (error) {
    console.error('[Certificate] Failed to load logo:', error);
    // Se falhar ao carregar logo, usar texto como fallback
    ctx.fillStyle = darkRed;
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('1º CBM', 60, 100);
    ctx.font = 'bold 32px Arial';
    ctx.fillText('Lotus', 75, 135);
  }
  
  // 5. ÍCONE DE VERIFICAÇÃO NO CANTO SUPERIOR DIREITO
  // Círculo dourado
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(width - 90, 90, 35, 0, Math.PI * 2);
  ctx.stroke();
  
  // Círculo vermelho interno
  ctx.strokeStyle = darkRed;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(width - 90, 90, 25, 0, Math.PI * 2);
  ctx.stroke();
  
  // Check mark
  ctx.strokeStyle = darkRed;
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(width - 105, 90);
  ctx.lineTo(width - 95, 100);
  ctx.lineTo(width - 75, 80);
  ctx.stroke();
  
  // 6. TÍTULO "CERTIFICADO"
  ctx.fillStyle = darkRed;
  ctx.font = 'bold 56px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICADO', width / 2, 200);
  
  // 7. SUBTÍTULO "Certificamos que"
  ctx.fillStyle = darkRed;
  ctx.font = '24px Arial';
  ctx.fillText('Certificamos que', width / 2, 245);
  
  // 8. NOME DO ALUNO (destaque em vermelho escuro)
  ctx.fillStyle = darkRed;
  ctx.font = 'bold 48px Georgia';
  ctx.fillText(data.studentName, width / 2, 310);
  
  // 9. MATRÍCULA DO ALUNO
  ctx.fillStyle = darkRed;
  ctx.font = '20px Arial';
  ctx.fillText(`Matrícula: ${data.studentId}`, width / 2, 345);
  
  // 10. LINHA DIVISORIA 1
  ctx.strokeStyle = darkRed;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 365);
  ctx.lineTo(width - 60, 365);
  ctx.stroke();
  
  // 11. TEXTO "Concluiu com êxito o curso de"
  ctx.fillStyle = darkRed;
  ctx.font = '22px Arial';
  ctx.fillText('Concluiu com êxito o curso de', width / 2, 410);
  
  // 12. NOME DO CURSO (destaque)
  ctx.fillStyle = darkRed;
  ctx.font = 'bold 42px Georgia';
  ctx.fillText(data.courseName, width / 2, 465);
  
  // 13. LINHA DIVISORIA 2
  ctx.strokeStyle = darkRed;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 490);
  ctx.lineTo(width - 60, 490);
  ctx.stroke();
  
  // 14. ASSINATURA DO INSTRUTOR (cursiva)
  ctx.fillStyle = darkRed;
  ctx.font = 'italic 36px Georgia';
  ctx.fillText(data.instructorName, width / 2, 545);
  
  // 15. LINHA DA ASSINATURA
  ctx.strokeStyle = darkRed;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(width / 2 - 200, 555);
  ctx.lineTo(width / 2 + 200, 555);
  ctx.stroke();
  
  // 16. CARGO DO INSTRUTOR
  ctx.fillStyle = darkRed;
  ctx.font = 'bold 22px Arial';
  ctx.fillText(data.instructorRank, width / 2, 590);
  
  // 17. ID DO CERTIFICADO (canto inferior direito)
  const certId = `CBM-${data.studentId.substring(0, 4).toUpperCase()}`;
  ctx.fillStyle = darkRed;
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'right';
  ctx.fillText(`ID: ${certId}`, width - 60, height - 40);
  
  // Converter canvas para buffer PNG
  return canvas.toBuffer('image/png');
}

/**
 * Faz upload do certificado para S3 e retorna URL pública
 */
export async function uploadCertificateToS3(imageBuffer: Buffer, fileName: string): Promise<string> {
  try {
    const result = await storagePut(
      `certificates/${fileName}`,
      imageBuffer,
      'image/png'
    );
    
    return result.url;
  } catch (error) {
    console.error('[Certificates] Failed to upload to S3:', error);
    throw new Error('Falha ao fazer upload do certificado');
  }
}

/**
 * Envia certificado para o canal do Discord
 */
export async function sendCertificateToDiscord(
  certificateUrl: string,
  data: CertificateData
): Promise<void> {
  try {
    const { EmbedBuilder } = await import('discord.js');
    const { getDiscordClient } = await import('./_core/discord');
    
    const client = getDiscordClient();
    if (!client) {
      console.warn('[Certificates] Discord client not available');
      return;
    }
    
    const channelId = ENV.discordChannelCertificates;
    if (!channelId) {
      console.warn('[Certificates] DISCORD_CHANNEL_CERTIFICATES not configured');
      return;
    }
    
    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased() || channel.isDMBased()) {
      console.warn('[Certificates] Invalid channel');
      return;
    }
    
    const dateStr = data.issuedAt.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo'
    });
    
    const embed = new EmbedBuilder()
      .setTitle('🎓 CERTIFICADO EMITIDO')
      .setColor(0xb91c1c) // Vermelho CBM
      .addFields(
        { name: 'Aluno', value: `${data.studentName} | ${data.studentId}`, inline: false },
        { name: 'Curso', value: data.courseName, inline: false },
        { name: 'Instrutor', value: `${data.instructorName} | ${data.instructorRank}`, inline: false }
      );
    
    if (data.auxiliar && data.ID_auxiliar) {
      embed.addFields({ name: 'Auxiliar', value: `${data.auxiliar} | ${data.ID_auxiliar}`, inline: false });
    }
    
    embed.addFields({ name: 'Data', value: dateStr, inline: false });
    embed.setImage(certificateUrl);
    embed.setTimestamp();
    
    await channel.send({ embeds: [embed] });
    
    console.log('[Certificates] Certificate sent to Discord');
  } catch (error) {
    console.error('[Certificates] Failed to send to Discord:', error);
    // Não lançar erro para não bloquear o fluxo
  }
}

/**
 * Função completa: gera, faz upload e envia certificado
 */
export async function issueCertificate(data: CertificateData): Promise<string> {
  // Gerar imagem
  const imageBuffer = await generateCertificateImage(data);
  
  // Criar nome único do arquivo
  const timestamp = Date.now();
  const fileName = `${data.studentId}_${timestamp}.png`;
  
  // Upload para S3
  const certificateUrl = await uploadCertificateToS3(imageBuffer, fileName);
  
  // Enviar para Discord
  await sendCertificateToDiscord(certificateUrl, data);
  
  return certificateUrl;
}
