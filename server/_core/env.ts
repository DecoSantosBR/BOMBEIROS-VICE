// Validar variáveis críticas
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
if (!NEXTAUTH_SECRET || NEXTAUTH_SECRET.length === 0) {
  throw new Error("NEXTAUTH_SECRET is required but not defined");
}

export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: NEXTAUTH_SECRET,
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  discordBotToken: process.env.DISCORD_BOT_TOKEN ?? "",
  discordChannelEvents: process.env.DISCORD_CHANNEL_EVENTS ?? "",
  discordChannelEnrollments: process.env.DISCORD_CHANNEL_ENROLLMENTS ?? "",
  discordChannelCertificates: process.env.DISCORD_CHANNEL_CERTIFICATES ?? "",
};
