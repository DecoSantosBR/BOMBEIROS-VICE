import { generateCertificateWithCanvas } from './server/certificates-canvas.ts';
import { writeFileSync } from 'fs';

console.log('Testando geração de certificado com Canvas...');

const testData = {
  studentName: 'Fernando Lima',
  studentId: '5310',
  courseName: 'TAF',
  instructorName: 'Close Jackson',
  instructorRank: 'Subcomandante Geral'
};

try {
  const buffer = await generateCertificateWithCanvas(testData);
  writeFileSync('test-canvas-certificate.png', buffer);
  console.log('✅ Certificado gerado com sucesso!');
  console.log('📁 Salvo em: test-canvas-certificate.png');
  console.log(`📊 Tamanho: ${buffer.length} bytes`);
} catch (error) {
  console.error('❌ Erro ao gerar certificado:', error);
  process.exit(1);
}
