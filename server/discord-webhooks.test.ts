import { describe, it, expect } from "vitest";

describe("Discord Webhooks Configuration", () => {
  it("should have DISCORD_WEBHOOK_RECRUITMENT configured", async () => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_RECRUITMENT;
    expect(webhookUrl).toBeDefined();
    expect(webhookUrl).toContain("discord.com/api/webhooks/");
    
    // Test webhook is valid by sending a test message
    const response = await fetch(webhookUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "✅ Teste de webhook de recrutamento - configuração validada",
      }),
    });
    
    expect(response.ok).toBe(true);
  });

  it("should have DISCORD_WEBHOOK_APPROVED configured", async () => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_APPROVED;
    expect(webhookUrl).toBeDefined();
    expect(webhookUrl).toContain("discord.com/api/webhooks/");
    
    const response = await fetch(webhookUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "✅ Teste de webhook de aprovados - configuração validada",
      }),
    });
    
    expect(response.ok).toBe(true);
  });

  it("should have DISCORD_WEBHOOK_REJECTED configured", async () => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_REJECTED;
    expect(webhookUrl).toBeDefined();
    expect(webhookUrl).toContain("discord.com/api/webhooks/");
    
    const response = await fetch(webhookUrl!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: "✅ Teste de webhook de reprovados - configuração validada",
      }),
    });
    
    expect(response.ok).toBe(true);
  });
});
