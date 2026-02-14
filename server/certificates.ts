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
 * Retorna buffer da imagem PNG
 */
export async function generateCertificateImage(data: CertificateData): Promise<Buffer> {
  // TODO: Implementar geração real com canvas
  // Por enquanto, retorna um placeholder
  
  const { createCanvas } = await import('canvas');
  
  // Criar canvas 1920x1080 (Full HD)
  const canvas = createCanvas(1920, 1080);
  const ctx = canvas.getContext('2d');
  
  // Fundo branco
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 1920, 1080);
  
  // Borda decorativa
  ctx.strokeStyle = '#b91c1c'; // Vermelho CBM
  ctx.lineWidth = 20;
  ctx.strokeRect(50, 50, 1820, 980);
  
  // Título
  ctx.fillStyle = '#b91c1c';
  ctx.font = 'bold 72px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICADO', 960, 200);
  
  // Subtítulo
  ctx.font = '48px Arial';
  ctx.fillStyle = '#333333';
  ctx.fillText('Corpo de Bombeiros Militar', 960, 280);
  
  // Texto principal
  ctx.font = '36px Arial';
  ctx.fillStyle = '#000000';
  ctx.fillText('Certificamos que', 960, 400);
  
  // Nome do aluno (destaque)
  ctx.font = 'bold 56px Arial';
  ctx.fillStyle = '#b91c1c';
  ctx.fillText(data.studentName, 960, 480);
  
  // Matrícula
  ctx.font = '32px Arial';
  ctx.fillStyle = '#666666';
  ctx.fillText(`Matrícula: ${data.studentId}`, 960, 530);
  
  // Texto do curso
  ctx.font = '36px Arial';
  ctx.fillStyle = '#000000';
  ctx.fillText('concluiu com êxito o curso de', 960, 620);
  
  // Nome do curso (destaque)
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#b91c1c';
  ctx.fillText(data.courseName, 960, 690);
  
  // Instrutor
  ctx.font = '32px Arial';
  ctx.fillStyle = '#333333';
  ctx.fillText(`Instrutor: ${data.instructorRank} ${data.instructorName}`, 960, 800);
  
  // Auxiliar (se houver)
  if (data.auxiliar && data.ID_auxiliar) {
    ctx.fillText(`Auxiliar: ${data.auxiliar} (${data.ID_auxiliar})`, 960, 850);
  }
  
  // Data de emissão
  ctx.font = '28px Arial';
  ctx.fillStyle = '#666666';
  const dateStr = data.issuedAt.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo'
  });
  ctx.fillText(`Emitido em ${dateStr}`, 960, 950);
  
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
