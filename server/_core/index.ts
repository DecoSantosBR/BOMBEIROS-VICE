import "dotenv/config";
import express from "express";
import cors from "cors";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import uploadImageRouter from "../uploadImage";
import uploadFileRouter from "../uploadFile";
import { initiateDiscordOAuth, handleDiscordCallback } from "../discord";
import { initDiscordBot } from "./discord";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  
  // ✅ CRÍTICO para Railway / proxies
  app.set("trust proxy", 1);
  
  // ✅ CORS com credentials (ANTES DAS ROTAS)
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  
  // ✅ Healthcheck routes (OBRIGATÓRIO para Railway) - DEVE VIR ANTES DE TUDO
  app.get("/", (req, res) => {
    res.status(200).send("OK");
  });

  app.get("/health", (req, res) => {
    res.status(200).json({ status: "healthy" });
  });
  
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Discord OAuth routes
  app.get("/api/auth/discord", initiateDiscordOAuth);
  app.get("/api/auth/discord/callback", handleDiscordCallback);
  // Image upload endpoint
  app.use("/api", uploadImageRouter);
  // File upload endpoint
  app.use("/api", uploadFileRouter);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT) || 3000;
  const host = "0.0.0.0";
  
  console.log("ENV PORT =", process.env.PORT);
  console.log("Listening on port:", port);

  server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}/`);
  });
  
  // Initialize Discord bot em paralelo (não bloquear servidor)
  // 🔴 DESABILITADO EM PRODUÇÃO: Limite de memória (1GB) sendo excedido
  if (process.env.NODE_ENV === "development") {
    initDiscordBot()
      .then(() => {
        console.log("✅ Discord bot initialized successfully");
      })
      .catch((error) => {
        console.error("❌ Discord bot initialization failed:", error);
        // Não deixar o erro matar o servidor
      });
  } else {
    console.log("⚠️ Discord bot DISABLED in production (memory limit)");
  }
}

startServer().catch(console.error);
