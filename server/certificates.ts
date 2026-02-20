import puppeteer from "puppeteer-core";
import { storagePut } from "./storage";
import { withRetry } from "./utils/retry";
import { ENV } from "./_core/env";
import path from "path";

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
 * Gera imagem do certificado usando Puppeteer (HTML/CSS)
 * Design idêntico ao modelo oficial do 1º CBM Vice City
 * Retorna buffer da imagem PNG
 */
export async function generateCertificateImage(data: CertificateData): Promise<Buffer> {
  // Carregar logo e fonte como base64
  const { fileURLToPath } = await import("url");
  const { dirname, join } = await import("path");
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  // Usar URL do S3 para o logo correto do CBM Vice City
  const logoUrl = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663187653950/HWRXabaRBVTfjmEx.png";
  
  // Log de debug para verificar dados recebidos
  console.log('[generateCertificateImage] Dados recebidos:', {
    studentName: data.studentName,
    studentId: data.studentId,
    courseName: data.courseName,
    instructorName: data.instructorName,
    instructorRank: data.instructorRank
  });
  const logoResponse = await fetch(logoUrl);
  const logoBuffer = Buffer.from(await logoResponse.arrayBuffer());
  const logoBase64 = logoBuffer.toString("base64");
  
  // Usar URL do S3 para a fonte
  const fontUrl = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663187653950/RvhRYWGRUIBmbVCt.otf";
  const fontResponse = await fetch(fontUrl);
  const fontBuffer = Buffer.from(await fontResponse.arrayBuffer());
  const fontBase64 = fontBuffer.toString("base64");

  // Gerar ID único do certificado
  const certificateId = `CBM-${data.studentId.substring(0, 4).toUpperCase()}-${Date.now().toString().slice(-4)}`;

  // Template HTML do certificado
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        @font-face {
          font-family: 'Optimistral';
          src: url('data:font/opentype;base64,${fontBase64}') format('opentype');
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          width: 1200px;
          height: 800px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
        }
        
        .certificate {
          width: 1200px;
          height: 720px;
          background: linear-gradient(135deg, #F5E6D3 0%, #EDE4D3 100%);
          border: 16px solid #A52A2A;
          border-radius: 20px;
          box-shadow: inset 0 0 0 3px #D4AF37;
          position: relative;
          padding: 50px 60px 100px 60px;
          font-family: Georgia, serif;
        }
        
        .logo {
          position: absolute;
          top: 50px;
          left: 50px;
          width: 100px;
          height: 100px;
        }
        
        .check-icon {
          position: absolute;
          top: 55px;
          right: 90px;
          width: 70px;
          height: 70px;
          border: 4px solid #D4AF37;
          border-radius: 50%;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .check-inner {
          width: 50px;
          height: 50px;
          border: 3px solid #8B1A1A;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .check-inner::after {
          content: '✓';
          font-size: 32px;
          color: #8B1A1A;
          font-weight: bold;
        }
        
        
        .title {
          text-align: center;
          margin-top: 100px;
          margin-bottom: 10px;
        }
        
        .title h1 {
          font-size: 56px;
          color: #8B1A1A;
          font-weight: bold;
          letter-spacing: 8px;
          margin: 0;
        }
        
        .subtitle {
          text-align: center;
          margin-bottom: 20px;
        }
        
        .subtitle p {
          font-size: 24px;
          color: #8B1A1A;
          font-style: italic;
        }
        
        .student-name {
          text-align: center;
          margin: 20px 0;
        }
        
        .student-name h2 {
          font-size: 48px;
          color: #8B1A1A;
          font-weight: bold;
          margin: 0;
        }
        
        .student-id {
          text-align: center;
          margin-bottom: 25px;
        }
        
        .student-id p {
          font-size: 20px;
          color: #8B1A1A;
          font-weight: bold;
        }
        
        .divider {
          width: calc(100% - 120px);
          height: 2px;
          background: #8B1A1A;
          margin: 20px auto;
        }
        
        .course-intro {
          text-align: center;
          margin: 25px 0 20px 0;
        }
        
        .course-intro p {
          font-size: 20px;
          color: #8B1A1A;
          font-style: italic;
        }
        
        .course-name {
          text-align: center;
          margin: 25px 0;
        }
        
        .course-name h2 {
          font-size: 48px;
          color: #8B1A1A;
          font-weight: bold;
          margin: 0;
        }
        
        .signature-section {
          margin-top: 25px;
          text-align: center;
        }
        
        .signature {
          font-family: 'Optimistral', Georgia, cursive;
          font-size: 40px;
          color: #8B1A1A;
          margin-bottom: 10px;
        }
        
        .signature-line {
          width: 400px;
          height: 1.5px;
          background: #8B1A1A;
          margin: 10px auto 15px auto;
        }
        
        .instructor-rank {
          font-size: 22px;
          color: #8B1A1A;
          font-weight: bold;
          margin-top: 0;
        }
        
        .certificate-id {
          position: absolute;
          bottom: 50px;
          right: 60px;
          font-size: 18px;
          color: #8B1A1A;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="certificate">
        <img src="data:image/png;base64,${logoBase64}" class="logo" alt="CBM Vice City Logo">
        
        <div class="check-icon">
          <div class="check-inner"></div>
        </div>
        
        
        <div class="title">
          <h1>CERTIFICADO</h1>
        </div>
        
        <div class="subtitle">
          <p>Certificamos que</p>
        </div>
        
        <div class="student-name">
          <h2>${data.studentName}</h2>
        </div>
        
        <div class="student-id">
          <p>Matrícula: ${data.studentId}</p>
        </div>
        
        <div class="divider"></div>
        
        <div class="course-intro">
          <p>Concluiu com êxito o curso de</p>
        </div>
        
        <div class="course-name">
          <h2>${data.courseName}</h2>
        </div>
        
        <div class="divider"></div>
        
        <div class="signature-section">
          <div class="signature">${data.instructorName}</div>
          <div class="signature-line"></div>
          <div class="instructor-rank">${data.instructorRank}</div>
        </div>
        
        <div class="certificate-id">ID: ${certificateId}</div>
      </div>
    </body>
    </html>
  `;

  // Gerar imagem usando Puppeteer + @sparticuz/chromium com retry automático
  console.log('[Certificates] Launching Puppeteer with @sparticuz/chromium (with retry)');
  
  // Log de diagnóstico de ambiente
  console.log('[Certificates] Environment check:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    hasDatabase: !!process.env.RAILWAY_DATABASE_URL,
    hasS3: !!process.env.AWS_ACCESS_KEY_ID,
  });
  
  return await withRetry(async () => {
    console.log("[CERTIFICATE] Launching Chromium via Nix PATH (auto-detect)");
    
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      await page.setContent(html, { waitUntil: "networkidle0" });
      
      // Aguardar renderização completa das fontes e imagens
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Capturar apenas o elemento do certificado, sem bordas brancas
      const certificateElement = await page.$('.certificate');
      const screenshot = certificateElement 
        ? await certificateElement.screenshot({ type: "png" })
        : await page.screenshot({
            type: "png",
            fullPage: false,
          });

      if (!screenshot) {
        throw new Error('Failed to generate certificate screenshot');
      }
      
      return Buffer.from(screenshot);
    } finally {
      await browser.close();
    }
  }, 3, 1000);
}

/**
 * Faz upload do certificado para S3 e retorna URL pública
 */
export async function uploadCertificateToS3(
  imageBuffer: Buffer,
  fileName: string
): Promise<string> {
  try {
    const result = await storagePut(
      `certificates/${fileName}`,
      imageBuffer,
      "image/png"
    );

    return result.url;
  } catch (error) {
    console.error("[Certificates] Failed to upload to S3:", error);
    throw new Error("Falha ao fazer upload do certificado");
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
    const { EmbedBuilder } = await import("discord.js");
    const { getDiscordClient } = await import("./_core/discord");

    const client = getDiscordClient();
    if (!client) {
      console.warn("[Certificates] Discord client not available");
      return;
    }

    const channelId = ENV.discordChannelCertificates;
    if (!channelId) {
      console.warn("[Certificates] DISCORD_CHANNEL_CERTIFICATES not configured");
      return;
    }

    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased() || channel.isDMBased()) {
      console.warn("[Certificates] Invalid channel");
      return;
    }

    const dateStr = data.issuedAt.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "America/Sao_Paulo",
    });

    const embed = new EmbedBuilder()
      .setTitle("🎓 CERTIFICADO EMITIDO")
      .setColor(0xb91c1c) // Vermelho CBM
      .addFields(
        {
          name: "Aluno",
          value: `${data.studentName} | ${data.studentId}`,
          inline: false,
        },
        { name: "Curso", value: data.courseName, inline: false },
        {
          name: "Instrutor",
          value: `${data.instructorName} | ${data.instructorRank}`,
          inline: false,
        }
      );

    if (data.auxiliar && data.ID_auxiliar) {
      embed.addFields({
        name: "Auxiliar",
        value: `${data.auxiliar} | ${data.ID_auxiliar}`,
        inline: false,
      });
    }

    embed.addFields({ name: "Data", value: dateStr, inline: false });
    embed.setImage(certificateUrl);
    embed.setTimestamp();

    await channel.send({ embeds: [embed] });

    console.log("[Certificates] Certificate sent to Discord");
  } catch (error) {
    console.error("[Certificates] Failed to send to Discord:", error);
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
