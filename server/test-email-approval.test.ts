import { describe, it, expect } from "vitest";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

describe("Email and Approval Status Tests", () => {
  it("should create user with email when recruitment form is submitted", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const testDiscordId = "TEST_EMAIL_123456";
    const testEmail = "teste@bombeiros.com";
    const testNome = "Teste Email User";
    const testIdViceCity = "88888";

    // Limpar dados de teste anteriores
    await db.execute(sql`DELETE FROM users WHERE \`discordId\` = ${testDiscordId}`);

    // Simular criação de usuário como no createRecruitmentApplication
    const newUserResult = await db.execute(
      sql`INSERT INTO users 
       (\`openId\`, \`name\`, \`email\`, \`discordId\`, \`studentId\`, \`rank\`, \`role\`, \`approvalStatus\`, \`createdAt\`, \`updatedAt\`, \`lastSignedIn\`)
       VALUES (${`discord_${testDiscordId}`}, ${testNome}, ${testEmail}, ${testDiscordId}, ${testIdViceCity}, 'Soldado', 'member', 'pending', NOW(), NOW(), NOW())`
    );

    const userId = Number(newUserResult[0].insertId);
    expect(userId).toBeGreaterThan(0);

    // Verificar se o e-mail foi salvo corretamente
    const userCheck = await db.execute(
      sql`SELECT * FROM users WHERE id = ${userId} LIMIT 1`
    );
    const userRows = userCheck[0] as unknown as any[];
    
    expect(userRows.length).toBe(1);
    const user = userRows[0];
    
    console.log("Usuário criado com e-mail:", user);
    
    // Verificar campos
    expect(user.name).toBe(testNome);
    expect(user.email).toBe(testEmail);
    expect(user.discordId).toBe(testDiscordId);
    expect(user.studentId).toBe(testIdViceCity);
    expect(user.rank).toBe("Soldado");
    expect(user.approvalStatus).toBe("pending");

    // Limpar dados de teste
    await db.execute(sql`DELETE FROM users WHERE \`discordId\` = ${testDiscordId}`);
  });

  it("should update approvalStatus to approved when recruitment is approved", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const testDiscordId = "TEST_APPROVAL_654321";
    const testEmail = "aprovado@bombeiros.com";
    const testNome = "Teste Aprovado";
    const testIdViceCity = "77777";

    // Limpar dados de teste anteriores
    await db.execute(sql`DELETE FROM users WHERE \`discordId\` = ${testDiscordId}`);

    // Criar usuário com status pending
    await db.execute(
      sql`INSERT INTO users 
       (\`openId\`, \`name\`, \`email\`, \`discordId\`, \`studentId\`, \`rank\`, \`role\`, \`approvalStatus\`, \`createdAt\`, \`updatedAt\`, \`lastSignedIn\`)
       VALUES (${`discord_${testDiscordId}`}, ${testNome}, ${testEmail}, ${testDiscordId}, ${testIdViceCity}, 'Soldado', 'member', 'pending', NOW(), NOW(), NOW())`
    );

    // Verificar status inicial
    let userCheck = await db.execute(
      sql`SELECT \`approvalStatus\` FROM users WHERE \`discordId\` = ${testDiscordId} LIMIT 1`
    );
    let userRows = userCheck[0] as unknown as any[];
    expect(userRows[0].approvalStatus).toBe("pending");

    // Simular aprovação (como no handleRecruitmentApproval)
    await db.execute(
      sql`UPDATE users SET \`approvalStatus\` = 'approved' WHERE \`discordId\` = ${testDiscordId}`
    );

    // Verificar se foi atualizado para approved
    userCheck = await db.execute(
      sql`SELECT \`approvalStatus\` FROM users WHERE \`discordId\` = ${testDiscordId} LIMIT 1`
    );
    userRows = userCheck[0] as unknown as any[];
    
    console.log("Status após aprovação:", userRows[0].approvalStatus);
    expect(userRows[0].approvalStatus).toBe("approved");

    // Limpar dados de teste
    await db.execute(sql`DELETE FROM users WHERE \`discordId\` = ${testDiscordId}`);
  });
});
