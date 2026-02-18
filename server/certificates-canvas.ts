import { createCanvas, loadImage, registerFont } from 'canvas';
import { storagePut } from './storage';

export interface CertificateData {
  studentName: string;
  studentId: string;
  courseName: string;
  instructorName: string;
  instructorRank: string;
}

const CERTIFICATE_WIDTH = 1200;
const CERTIFICATE_HEIGHT = 720;

export async function generateCertificateWithCanvas(data: CertificateData): Promise<Buffer> {
  console.log('[Canvas] Gerando certificado:', data);

  // Criar canvas
  const canvas = createCanvas(CERTIFICATE_WIDTH, CERTIFICATE_HEIGHT);
  const ctx = canvas.getContext('2d');

  // Fundo bege
  ctx.fillStyle = '#f5f0e8';
  ctx.fillRect(0, 0, CERTIFICATE_WIDTH, CERTIFICATE_HEIGHT);

  // Borda externa vermelha
  ctx.strokeStyle = '#8B1A1A';
  ctx.lineWidth = 20;
  ctx.strokeRect(10, 10, CERTIFICATE_WIDTH - 20, CERTIFICATE_HEIGHT - 20);

  // Borda interna dourada
  ctx.strokeStyle = '#DAA520';
  ctx.lineWidth = 4;
  ctx.strokeRect(30, 30, CERTIFICATE_WIDTH - 60, CERTIFICATE_HEIGHT - 60);

  // Logo (canto superior esquerdo)
  try {
    const logo = await loadImage('https://manus-files.s3.us-west-1.amazonaws.com/f/vice_city_bombeiros_colors-1739939267695.png');
    ctx.drawImage(logo, 70, 70, 120, 120);
  } catch (error) {
    console.error('[Canvas] Erro ao carregar logo:', error);
  }

  // Selo de verificação (canto superior direito)
  ctx.fillStyle = '#DAA520';
  ctx.beginPath();
  ctx.arc(CERTIFICATE_WIDTH - 130, 105, 45, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.strokeStyle = '#8B1A1A';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(CERTIFICATE_WIDTH - 130, 105, 45, 0, Math.PI * 2);
  ctx.stroke();

  // Checkmark no selo
  ctx.strokeStyle = '#8B1A1A';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(CERTIFICATE_WIDTH - 150, 105);
  ctx.lineTo(CERTIFICATE_WIDTH - 135, 120);
  ctx.lineTo(CERTIFICATE_WIDTH - 110, 90);
  ctx.stroke();

  // Título "CERTIFICADO"
  ctx.fillStyle = '#8B1A1A';
  ctx.font = 'bold 80px Georgia';
  ctx.textAlign = 'center';
  ctx.fillText('CERTIFICADO', CERTIFICATE_WIDTH / 2, 220);

  // Subtítulo "Certificamos que"
  ctx.fillStyle = '#8B1A1A';
  ctx.font = 'italic 24px Georgia';
  ctx.fillText('Certificamos que', CERTIFICATE_WIDTH / 2, 270);

  // Nome do aluno
  ctx.fillStyle = '#8B1A1A';
  ctx.font = 'bold 56px Georgia';
  ctx.fillText(data.studentName, CERTIFICATE_WIDTH / 2, 340);

  // Matrícula
  ctx.fillStyle = '#8B1A1A';
  ctx.font = 'bold 20px Georgia';
  ctx.fillText(`Matrícula: ${data.studentId}`, CERTIFICATE_WIDTH / 2, 380);

  // Linha horizontal
  ctx.strokeStyle = '#8B1A1A';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(135, 405);
  ctx.lineTo(CERTIFICATE_WIDTH - 135, 405);
  ctx.stroke();

  // Texto "Concluiu com êxito o curso de"
  ctx.fillStyle = '#8B1A1A';
  ctx.font = 'italic 20px Georgia';
  ctx.fillText('Concluiu com êxito o curso de', CERTIFICATE_WIDTH / 2, 445);

  // Nome do curso
  ctx.fillStyle = '#8B1A1A';
  ctx.font = 'bold 48px Georgia';
  ctx.fillText(data.courseName, CERTIFICATE_WIDTH / 2, 510);

  // Linha horizontal inferior
  ctx.strokeStyle = '#8B1A1A';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(135, 540);
  ctx.lineTo(CERTIFICATE_WIDTH - 135, 540);
  ctx.stroke();

  // Assinatura do instrutor (fonte cursiva simulada)
  ctx.fillStyle = '#8B1A1A';
  ctx.font = 'italic 40px Georgia';
  ctx.fillText(data.instructorName, CERTIFICATE_WIDTH / 2, 600);

  // Linha de assinatura
  ctx.strokeStyle = '#8B1A1A';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(400, 615);
  ctx.lineTo(800, 615);
  ctx.stroke();

  // Cargo do instrutor
  ctx.fillStyle = '#8B1A1A';
  ctx.font = 'bold 18px Georgia';
  ctx.fillText(data.instructorRank, CERTIFICATE_WIDTH / 2, 640);

  // ID do certificado (canto inferior direito)
  const certificateId = `CBM-${data.studentId}-${Math.floor(Math.random() * 10000)}`;
  ctx.fillStyle = '#8B1A1A';
  ctx.font = 'bold 16px Georgia';
  ctx.textAlign = 'right';
  ctx.fillText(`ID: ${certificateId}`, CERTIFICATE_WIDTH - 50, CERTIFICATE_HEIGHT - 30);

  // Converter para buffer PNG
  return canvas.toBuffer('image/png');
}

export async function issueCertificateCanvas(data: CertificateData) {
  console.log('[Certificates Canvas] Emitindo certificado:', data);

  // Gerar imagem do certificado
  const imageBuffer = await generateCertificateWithCanvas(data);

  // Upload para S3
  const filename = `certificate-${data.studentId}-${Date.now()}.png`;
  const { url } = await storagePut(`certificates/${filename}`, imageBuffer, 'image/png');

  console.log('[Certificates Canvas] Certificado gerado:', url);

  return {
    certificateUrl: url,
    certificateId: `CBM-${data.studentId}-${Math.floor(Math.random() * 10000)}`,
  };
}
