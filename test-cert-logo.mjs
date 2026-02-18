import { generateCertificateImage } from "./server/certificates.ts";
import fs from "fs";

const testData = {
  studentName: "Close Jackson",
  studentId: "17932",
  courseName: "TAF",
  instructorName: "Marco Laa",
  instructorRank: "Subcomandante Geral",
  issuedAt: new Date(),
};

console.log("Gerando certificado de teste...");
const buffer = await generateCertificateImage(testData);
fs.writeFileSync("test-certificate-logo.png", buffer);
console.log("✅ Certificado salvo em test-certificate-logo.png");
console.log("Tamanho:", buffer.length, "bytes");
