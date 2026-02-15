// Teste simples para verificar se o canvas está funcionando
import { createCanvas } from "canvas";

try {
  console.log("[Canvas Test] Iniciando teste do canvas...");
  
  // Criar um canvas de teste
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext("2d");
  
  // Desenhar algo simples
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 100, 100);
  
  // Converter para buffer
  const buffer = canvas.toBuffer("image/png");
  
  console.log("[Canvas Test] ✅ Canvas funcionando corretamente!");
  console.log("[Canvas Test] Buffer gerado com", buffer.length, "bytes");
  
  process.exit(0);
} catch (error) {
  console.error("[Canvas Test] ❌ Erro ao testar canvas:", error);
  process.exit(1);
}
