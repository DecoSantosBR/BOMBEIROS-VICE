import { describe, it, expect } from "vitest";

describe("Discord OAuth Configuration", () => {
  it("should have DISCORD_CLIENT_ID configured", () => {
    expect(process.env.DISCORD_CLIENT_ID).toBeDefined();
    expect(process.env.DISCORD_CLIENT_ID).not.toBe("");
  });

  it("should have DISCORD_CLIENT_SECRET configured", () => {
    expect(process.env.DISCORD_CLIENT_SECRET).toBeDefined();
    expect(process.env.DISCORD_CLIENT_SECRET).not.toBe("");
  });

  it("should have DISCORD_REDIRECT_URI configured", () => {
    expect(process.env.DISCORD_REDIRECT_URI).toBeDefined();
    expect(process.env.DISCORD_REDIRECT_URI).not.toBe("");
    expect(process.env.DISCORD_REDIRECT_URI).toContain("https://");
    expect(process.env.DISCORD_REDIRECT_URI).toContain("/api/auth/discord/callback");
  });

  it("should have valid Discord redirect URI format", () => {
    const redirectUri = process.env.DISCORD_REDIRECT_URI || "";
    const urlPattern = /^https:\/\/.+\/api\/auth\/discord\/callback$/;
    expect(redirectUri).toMatch(urlPattern);
  });
});
