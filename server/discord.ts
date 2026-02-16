import type { Request, Response } from "express";
import * as db from "./db";
import { users, type User } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { ENV } from "./_core/env";
import { getSessionCookieOptions } from "./_core/cookies";
import { sdk } from "./_core/sdk";
import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Discord OAuth configuration
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || "";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || "";
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI || "";

const DISCORD_API_ENDPOINT = "https://discord.com/api/v10";
const DISCORD_OAUTH_URL = "https://discord.com/oauth2/authorize";
const DISCORD_TOKEN_URL = "https://discord.com/api/oauth2/token";
const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID || "";

// Emails de administradores
const ADMIN_EMAILS = ["decossantos2@gmail.com", "close.jackson2025@gmail.com"];

// Mapeamento de cargos Discord para ranks do banco
function mapDiscordRankToDbRank(discordRank: string | null): typeof users.$inferSelect.rank | null {
  if (!discordRank) return null;
  
  const rankMap: Record<string, typeof users.$inferSelect.rank> = {
    "CMD": "Comandante Geral",
    "SCG": "Subcomandante Geral",
    "CEL": "Coronel",
    "T.CEL": "Tenente-Coronel",
    "MAJ": "Major",
    "CAP": "Capit\u00e3o",
    "1\u00ba TEN": "1\u00ba Tenente",
    "2\u00ba TEN": "2\u00ba Tenente",
    "ASP": "Aspirante",
    "SUB.T": "Subtenente",
    "SGT": "Sargento",
    "CB": "Cabo",
    "SD": "Soldado",
  };
  
  return rankMap[discordRank.toUpperCase()] || null;
}

// Determinar role do site baseado no cargo
function determineRoleFromRank(rank: typeof users.$inferSelect.rank | null, email: string | null | undefined): "admin" | "instructor" | "member" {
  // Verificar se é admin por email
  if (email && ADMIN_EMAILS.includes(email.toLowerCase())) {
    return "admin";
  }
  
  if (!rank) return "member";
  
  // Pra\u00e7as (SD, CB, SGT, Sub.T, ASP) → member
  const pracas = ["Soldado", "Cabo", "Sargento", "Subtenente", "Aspirante"];
  if (pracas.includes(rank)) {
    return "member";
  }
  
  // Oficiais e Alto-Comando → instructor
  const oficiais = ["2\u00ba Tenente", "1\u00ba Tenente", "Capit\u00e3o", "Major"];
  const altoComando = ["Tenente-Coronel", "Coronel", "Subcomandante Geral", "Comandante Geral"];
  
  if (oficiais.includes(rank) || altoComando.includes(rank)) {
    return "instructor";
  }
  
  return "member";
}

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  email?: string;
  avatar?: string;
  global_name?: string;
}

interface DiscordGuildMember {
  user: DiscordUser;
  nick?: string;
  roles: string[];
}

interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

/**
 * Inicia o fluxo OAuth do Discord
 * Redireciona o usuário para a página de autorização do Discord
 */
export function initiateDiscordOAuth(req: Request, res: Response) {
  if (!DISCORD_CLIENT_ID || !DISCORD_REDIRECT_URI) {
    return res.status(500).json({
      error: "Discord OAuth não está configurado. Configure DISCORD_CLIENT_ID e DISCORD_REDIRECT_URI.",
    });
  }

  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: "code",
    scope: "identify email guilds.members.read",
  });

  const authUrl = `${DISCORD_OAUTH_URL}?${params.toString()}`;
  res.redirect(authUrl);
}

/**
 * Processa o callback do Discord OAuth
 * Troca o código por um access token e busca informações do usuário
 */
export async function handleDiscordCallback(req: Request, res: Response) {
  const { code } = req.query;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Código de autorização não fornecido" });
  }

  if (!DISCORD_CLIENT_ID || !DISCORD_CLIENT_SECRET || !DISCORD_REDIRECT_URI) {
    return res.status(500).json({
      error: "Discord OAuth não está configurado corretamente.",
    });
  }

  try {
    console.log("[Discord OAuth] Iniciando callback...");
    console.log("[Discord OAuth] Code recebido:", code.substring(0, 10) + "...");
    
    // Trocar código por access token
    const tokenResponse = await fetch(DISCORD_TOKEN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: DISCORD_REDIRECT_URI,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text();
      console.error("[Discord OAuth] Erro ao obter token:", errorData);
      return res.status(500).json({ error: "Falha ao obter token do Discord" });
    }
    
    console.log("[Discord OAuth] Token obtido com sucesso");

    const tokenData: DiscordTokenResponse = await tokenResponse.json();

    // Buscar informações do usuário
    const userResponse = await fetch(`${DISCORD_API_ENDPOINT}/users/@me`, {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      const errorData = await userResponse.text();
      console.error("[Discord OAuth] Erro ao buscar usuário:", errorData);
      return res.status(500).json({ error: "Falha ao buscar informações do usuário" });
    }
    
    console.log("[Discord OAuth] Usuário obtido com sucesso");

    const discordUser: DiscordUser = await userResponse.json();

    console.log("[Discord OAuth] Discord User ID:", discordUser.id);
    console.log("[Discord OAuth] Discord Username:", discordUser.username);
    
    // Buscar informações do membro no servidor Discord
    let guildMember: DiscordGuildMember | null = null;
    let userRole: string = "member";
    let userRank: string | null = null;
    let userMatricula: string | null = null;
    
    if (DISCORD_SERVER_ID) {
      try {
        const memberResponse = await fetch(
          `${DISCORD_API_ENDPOINT}/users/@me/guilds/${DISCORD_SERVER_ID}/member`,
          {
            headers: {
              Authorization: `Bearer ${tokenData.access_token}`,
            },
          }
        );
        
        if (memberResponse.ok) {
          guildMember = await memberResponse.json();
          console.log("[Discord OAuth] Guild Member:", guildMember);
          
          // Extrair cargo e matrícula do nickname
          const nickname = guildMember?.nick || discordUser.global_name || discordUser.username;
          console.log("[Discord OAuth] Nickname:", nickname);
          
          // Formato esperado: "Cargo | Nome | Matrícula" ou "Cargo | Nome"
          const parts = nickname.split("|").map(p => p.trim());
          if (parts.length >= 2) {
            userRank = parts[0]; // Cargo (ex: SCG, SGT, etc)
            if (parts.length >= 3) {
              userMatricula = parts[2]; // Matrícula
            }
          }
          
          console.log("[Discord OAuth] User Rank (raw):", userRank);
          console.log("[Discord OAuth] User Matrícula:", userMatricula);
          
          // Mapear cargo Discord para rank do banco
          const mappedRank = mapDiscordRankToDbRank(userRank);
          
          // Determinar role baseado no cargo
          userRole = determineRoleFromRank(mappedRank, discordUser.email);
          userRank = mappedRank;
          
          console.log("[Discord OAuth] User Rank (mapped):", userRank);
          console.log("[Discord OAuth] User Role:", userRole);
        }
      } catch (error) {
        console.error("[Discord OAuth] Erro ao buscar membro do servidor:", error);
      }
    }
    
    // Verificar se já existe um usuário com este Discord ID
    const database = await db.getDb();
    if (!database) {
      return res.status(500).json({ error: "Database not available" });
    }

    const existingUsers = await database.select().from(users).where(eq(users.discordId, discordUser.id)).limit(1);
    const existingUser = existingUsers.length > 0 ? existingUsers[0] : null;

    let user;

    if (existingUser) {
      // Usuário já existe, atualizar lastSignedIn e dados do Discord
      await database
        .update(users)
        .set({ 
          lastSignedIn: new Date(),
          role: userRole as "admin" | "instructor" | "member",
          rank: userRank as typeof users.$inferSelect.rank,
          matricula: userMatricula,
        })
        .where(eq(users.id, existingUser.id));
      
      // Buscar usuário atualizado
      const updatedUsers = await database.select().from(users).where(eq(users.id, existingUser.id)).limit(1);
      user = updatedUsers.length > 0 ? updatedUsers[0] : existingUser;
    } else {
      // Criar novo usuário
      const displayName = `${discordUser.username}#${discordUser.discriminator}`;
      
      // Contar quantos usuários já foram aprovados (excluindo o owner)
      const approvedUsers = await database.select().from(users).where(eq(users.approvalStatus, "approved"));

      // Filtrar owner pelo openId
      const nonOwnerApprovedUsers = approvedUsers.filter(
        (u: User) => u.openId !== ENV.ownerOpenId
      );

      // Auto-aprovar os próximos 3 usuários como admin
      const shouldAutoApprove = nonOwnerApprovedUsers.length < 3;

      await database.insert(users).values({
        openId: `discord_${discordUser.id}`, // Criar um openId único para Discord
        name: displayName,
        email: discordUser.email || null,
        loginMethod: "discord",
        discordId: discordUser.id,
        role: userRole as "admin" | "instructor" | "member",
        rank: userRank as typeof users.$inferSelect.rank,
        matricula: userMatricula,
        approvalStatus: "approved", // Auto-aprovar todos os usuários do Discord
        lastSignedIn: new Date(),
      });

      // Buscar o usuário recém-criado pelo discordId
      const newUsers = await database.select().from(users).where(eq(users.discordId, discordUser.id)).limit(1);
      user = newUsers.length > 0 ? newUsers[0] : null;
    }

    if (!user) {
      return res.status(500).json({ error: "Falha ao criar ou recuperar usuário" });
    }

    // Approval is now automatic based on rank selection, no need to check approvalStatus
    // Criar cookie de sessão usando o mesmo padrão do OAuth
    const sessionToken = await sdk.createSessionToken(user.openId, {
      name: user.name || "",
      expiresInMs: ONE_YEAR_MS,
    });

    const cookieOptions = getSessionCookieOptions(req);
    res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

    // Redirecionar para home
    res.redirect("/");
  } catch (error) {
    console.error("[Discord OAuth] Erro no callback:", error);
    res.status(500).json({ error: "Erro interno ao processar login do Discord" });
  }
}

/**
 * Vincular conta Discord a um usuário existente
 */
export async function linkDiscordAccount(req: Request, res: Response) {
  const { userId, discordId } = req.body;

  if (!userId || !discordId) {
    return res.status(400).json({ error: "userId e discordId são obrigatórios" });
  }

  try {
    // Verificar se o Discord ID já está vinculado a outra conta
    const database = await db.getDb();
    if (!database) {
      return res.status(500).json({ error: "Database not available" });
    }

    const existingUsers = await database.select().from(users).where(eq(users.discordId, discordId)).limit(1);
    const existingUser = existingUsers.length > 0 ? existingUsers[0] : null;

    if (existingUser && existingUser.id !== userId) {
      return res.status(400).json({ error: "Esta conta Discord já está vinculada a outro usuário" });
    }

    // Vincular Discord ID ao usuário
    await database.update(users).set({ discordId }).where(eq(users.id, userId));

    res.json({ success: true, message: "Conta Discord vinculada com sucesso" });
  } catch (error) {
    console.error("Erro ao vincular conta Discord:", error);
    res.status(500).json({ error: "Erro ao vincular conta Discord" });
  }
}
