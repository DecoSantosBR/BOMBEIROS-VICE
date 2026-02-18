/**
 * Discord Bot Standalone
 * Container separado para rodar apenas o Discord bot
 * Compartilha banco de dados com o servidor web principal
 */

import "dotenv/config";
import { initDiscordBot } from "./_core/discord";

async function startBot() {
  console.log("[Bot Standalone] Starting Discord bot...");
  console.log("[Bot Standalone] Environment:", process.env.NODE_ENV);
  console.log("[Bot Standalone] Database URL:", process.env.RAILWAY_DATABASE_URL ? "✅ Configured" : "❌ Missing");
  
  try {
    const client = await initDiscordBot();
    
    if (client) {
      console.log("[Bot Standalone] ✅ Discord bot started successfully");
      
      // Keepalive para manter o processo vivo
      setInterval(() => {
        console.log("[Bot Standalone] Keepalive - Bot is running");
      }, 60000); // Log a cada 60 segundos
    } else {
      console.error("[Bot Standalone] ❌ Failed to start Discord bot");
      process.exit(1);
    }
  } catch (error) {
    console.error("[Bot Standalone] ❌ Error starting bot:", error);
    process.exit(1);
  }
}

// Capturar sinais de término
process.on("SIGTERM", () => {
  console.log("[Bot Standalone] ⚠️ Received SIGTERM, shutting down gracefully");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("[Bot Standalone] ⚠️ Received SIGINT, shutting down gracefully");
  process.exit(0);
});

process.on("uncaughtException", (error) => {
  console.error("[Bot Standalone] ❌ Uncaught exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  console.error("[Bot Standalone] ❌ Unhandled rejection:", reason);
  process.exit(1);
});

// Start the bot
startBot().catch((error) => {
  console.error("[Bot Standalone] ❌ Fatal error:", error);
  process.exit(1);
});
