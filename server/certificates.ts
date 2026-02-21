import { createCanvas, loadImage, GlobalFonts } from "@napi-rs/canvas";
import { storagePut } from "./storage";
import { withRetry } from "./utils/retry";
import { ENV } from "./_core/env";
import path from "path";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Registrar fontes
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  const fontConfigs = [
    { path: path.join(__dirname, "assets/fonts/LiberationSerif-Regular.ttf"), family: "Liberation Serif" },
    { path: path.join(__dirname, "assets/fonts/LiberationSerif-Bold.ttf"), family: "Liberation Serif" },
    { path: path.join(__dirname, "assets/fonts/LiberationSerif-Italic.ttf"), family: "Liberation Serif" },
    { path: path.join(__dirname, "assets/fonts/LiberationSerif-BoldItalic.ttf"), family: "Liberation Serif" },
    { path: path.join(__dirname, "assets/fonts/optimistral-graff.otf"), family: "Optimistral" },
  ];
  
  for (const config of fontConfigs) {
    try {
      if (existsSync(config.path)) {
        GlobalFonts.registerFromPath(config.path, config.family);
        console.log("[Certificates] Font registered:", config.path);
      }
    } catch (e) {
      console.warn("[Certificates] Failed to register font:", config.path);
    }
  }
  console.log("[Certificates] All registered fonts:", GlobalFonts.families);
} catch (e) {
  console.error("[Certificates] Could not register system fonts:", e);
}

/**
 * Interface para dados do certificado
 */
export interface CertificateData {
  studentName: string;
  studentId: string;
  courseName: string;
  instructorName: string;
  instructorRank: string;
}

// Cache de assets (carregados uma vez)
const assetsCache = {
  templatePromise: null as Promise<any> | null,
};

/**
 * Gera imagem do certificado usando Canvas
 */
export async function generateCertificateImage(data: CertificateData): Promise<Buffer> {
  console.log("[Certificates] Generating certificate with Canvas...");
  console.log("[Certificates] Data:", JSON.stringify(data));

  // Template (asset local com cache)
  const templatePath = path.join(__dirname, "assets/templates/certificate-template.png");
  
  try {
    // Carregar template (com cache)
    if (!assetsCache.templatePromise) {
      console.log("[Certificates] Loading template from:", templatePath);
      assetsCache.templatePromise = loadImage(templatePath);
    }
    const template = await assetsCache.templatePromise;
    console.log("[Certificates] Template loaded:", template.width, "x", template.height);

    // Criar canvas
    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext("2d");
    
    // Desenhar template de fundo (já contém o logo)
    ctx.drawImage(template, 0, 0);
    
    // Configurar estilo do texto
    ctx.fillStyle = "#8B0000"; // Vermelho escuro/maroon
    ctx.textAlign = "center";

    // Título "CERTIFICADO" - Ajustado: ↑25px (210-25=185), X=600px, letter-spacing
    ctx.font = "bold 70px 'DejaVu Serif', 'Liberation Serif', Georgia, serif";
    ctx.letterSpacing = "12px"; // +10 a +15 spacing
    ctx.fillText("CERTIFICADO", 600, 185);
    ctx.letterSpacing = "0px"; // Reset

    // Subtítulo "Certificamos que" - Ajustado: ↑10px (270-10=260), X=600px
    ctx.font = "20px 'DejaVu Serif', 'Liberation Serif', Georgia, serif";
    ctx.fillText("Certificamos que", 600, 260);

    // Nome do aluno (destaque) - Ajustado: ↓15px (325+15=340), X=600px, espaçamento 20px acima
    ctx.font = "bold 62px 'DejaVu Serif', 'Liberation Serif', Georgia, serif";
    ctx.fillText(data.studentName, 600, 340);

    // Matrícula do aluno - Ajustado: ↓10px (360+10=370), X=600px, fonte -10% (19→17px)
    ctx.font = "17px 'DejaVu Serif', 'Liberation Serif', Georgia, serif";
    ctx.fillText(`Matrícula: ${data.studentId}`, 600, 370);

    // Linha divisória superior - 30px abaixo da matrícula (370+30=400), X=100-1100px
    ctx.strokeStyle = "#8B0000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(100, 400);
    ctx.lineTo(1100, 400);
    ctx.stroke();
    
    // Texto "Concluiu com êxito o curso de" - Ajustado: ↓20px (410+20=430), X=600px
    ctx.font = "20px 'DejaVu Serif', 'Liberation Serif', Georgia, serif";
    ctx.fillText("Concluiu com êxito o curso de", 600, 430);

    // Nome do curso (destaque) - Ajustado: ↓10px (455+10=465), X=600px, fonte +15% (48→55px)
    ctx.font = "bold 55px 'DejaVu Serif', 'Liberation Serif', Georgia, serif";
    ctx.fillText(data.courseName, 600, 465);
    
    // Linha divisória inferior - 30px abaixo do curso (465+30=495), X=100-1100px
    ctx.beginPath();
    ctx.moveTo(100, 495);
    ctx.lineTo(1100, 495);
    ctx.stroke();

    // Nome do instrutor (assinatura manuscrita) - Ajustado: ↓20px (555+20=575), X=600px
    ctx.font = "36px 'Optimistral', cursive";
    ctx.fillText(data.instructorName, 600, 575);

    // Cargo do instrutor - Ajustado: X=600px, 10px abaixo da assinatura (575+10=585)
    ctx.font = "18px 'DejaVu Serif', 'Liberation Serif', Georgia, serif";
    ctx.fillText(data.instructorRank, 600, 585);

    // Converter para buffer PNG
    const buffer = canvas.toBuffer("image/png");
    console.log("[Certificates] Certificate generated successfully, size:", buffer.length, "bytes");
    
    return buffer;
  } catch (error) {
    console.error("[Certificates] Error generating certificate:", error);
    throw new Error("Failed to generate certificate");
  }
}

/**
 * Upload do certificado para S3
 */
export async function uploadCertificateToS3(
  certificateBuffer: Buffer,
  fileName: string
): Promise<string> {
  console.log("[Certificates] Uploading certificate to S3...");
  
  const result = await storagePut(
    `certificates/${fileName}.png`,
    certificateBuffer,
    "image/png"
  );
  
  console.log("[Certificates] Certificate uploaded to S3:", result.url);
  return result.url;
}

/**
 * Envia certificado para o Discord
 */
async function sendCertificateToDiscord(
  certificateUrl: string,
  data: CertificateData
): Promise<void> {
  console.log("[Certificates] Sending certificate to Discord...");
  
  const channelId = ENV.discordChannelCertificates;
  if (!channelId) {
    console.warn("[Certificates] Discord channel not configured");
    return;
  }

  try {
    const { client } = await import("./discord");
    
    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased() || channel.isDMBased()) {
      console.warn("[Certificates] Invalid channel");
      return;
    }

    const embed = {
      title: "🎓 Novo Certificado Emitido",
      color: 0x8B0000,
      fields: [
        { name: "Aluno", value: data.studentName, inline: true },
        { name: "Matrícula", value: data.studentId, inline: true },
        { name: "Curso", value: data.courseName, inline: false },
        { name: "Instrutor", value: `${data.instructorName} - ${data.instructorRank}`, inline: false },
      ],
      image: { url: certificateUrl },
      timestamp: new Date().toISOString(),
    };

    await channel.send({ embeds: [embed] });
    console.log("[Certificates] Certificate sent to Discord");
  } catch (error) {
    console.error("[Certificates] Error sending to Discord:", error);
  }
}

/**
 * Emite certificado completo (gera, faz upload e envia para Discord)
 */
export async function issueCertificate(data: CertificateData): Promise<string> {
  console.log("[Certificates] Starting certificate issuance...");
  console.log("[Certificates] Environment check:", {
    hasS3: !!process.env.AWS_ACCESS_KEY_ID,
  });
  
  return await withRetry(async () => {
    // Gerar certificado
    const certificateBuffer = await generateCertificateImage(data);
    
    // Upload para S3
    const fileName = `cert-${data.studentId}-${Date.now()}`;
    const certificateUrl = await uploadCertificateToS3(certificateBuffer, fileName);
    
    // Enviar para Discord
    await sendCertificateToDiscord(certificateUrl, data);
    
    console.log("[Certificates] Certificate issuance completed");
    return certificateUrl;
  }, 3, 2000);
}
