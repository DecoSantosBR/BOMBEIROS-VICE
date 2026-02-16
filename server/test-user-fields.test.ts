import { describe, it, expect } from "vitest";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

describe("User Fields Validation", () => {
  it("should insert discordId, studentId and rank correctly", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const testDiscordId = "123456789012345678";
    const testNome = "Teste Soldado";
    const testIdViceCity = "99999";
    const testRank = "Soldado";

    // Limpar dados de teste anteriores
    await db.execute(sql`DELETE FROM users WHERE discordId = ${testDiscordId}`);

    // Inserir usuário com os mesmos parâmetros do recruitment.ts
    const newUserResult = await db.execute(
      sql`INSERT INTO users 
       (\`openId\`, \`name\`, \`discordId\`, \`studentId\`, \`rank\`, \`role\`, \`approvalStatus\`, \`createdAt\`, \`updatedAt\`, \`lastSignedIn\`)
       VALUES (${`discord_${testDiscordId}`}, ${testNome}, ${testDiscordId}, ${testIdViceCity}, ${testRank}, 'member', 'pending', NOW(), NOW(), NOW())`
    );

    const userId = Number(newUserResult[0].insertId);
    expect(userId).toBeGreaterThan(0);

    // Verificar se os campos foram salvos corretamente
    const userCheck = await db.execute(
      sql`SELECT * FROM users WHERE id = ${userId} LIMIT 1`
    );
    const userRows = userCheck[0] as unknown as any[];
    
    expect(userRows.length).toBe(1);
    const user = userRows[0];
    
    console.log("Usuário criado:", user);
    
    // Verificar cada campo
    expect(user.name).toBe(testNome);
    expect(user.discordId).toBe(testDiscordId);
    expect(user.studentId).toBe(testIdViceCity);
    expect(user.rank).toBe(testRank);
    expect(user.role).toBe("member");
    expect(user.approvalStatus).toBe("pending");

    // Limpar dados de teste
    await db.execute(sql`DELETE FROM users WHERE discordId = ${testDiscordId}`);
  });
});
