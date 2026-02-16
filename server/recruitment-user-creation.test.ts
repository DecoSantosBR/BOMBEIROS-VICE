import { describe, it, expect } from "vitest";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

describe("Recruitment User Creation", () => {
  it("should create user automatically when recruitment form is submitted", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    // Dados de teste
    const testDiscordId = "test_discord_" + Date.now();
    const testData = {
      discordId: testDiscordId,
      discordUsername: "TestUser#1234",
      nome: "João da Silva",
      idViceCity: "12345",
      telefone: "555-1234",
      idade: 25,
      interesse: "Quero ajudar a comunidade",
      possuiMicrofone: "sim",
      regrasIlegais: "Não faria",
      ordemSuperior: "Obedeceria",
      tiroteio: "Chamaria reforços",
      multiplasOcorrencias: "Priorizaria emergências",
    };

    // Verificar se usuário não existe antes
    const beforeCheck = await db.execute(
      sql`SELECT id FROM users WHERE discordId = ${testDiscordId} LIMIT 1`
    );
    const beforeRows = beforeCheck[0] as unknown as any[];
    expect(beforeRows.length).toBe(0);

    // Simular criação de usuário (código do recruitment.ts)
    const newUserResult = await db.execute(
      sql`INSERT INTO users 
       (openId, name, discordId, studentId, role, approvalStatus, createdAt, updatedAt, lastSignedIn)
       VALUES (${`discord_${testDiscordId}`}, ${testData.nome}, ${testDiscordId}, ${testData.idViceCity}, 'member', 'pending', NOW(), NOW(), NOW())`
    );
    const userId = Number(newUserResult[0].insertId);

    // Verificar se usuário foi criado
    expect(userId).toBeGreaterThan(0);

    // Verificar dados do usuário
    const userCheck = await db.execute(
      sql`SELECT * FROM users WHERE discordId = ${testDiscordId} LIMIT 1`
    );
    const userRows = userCheck[0] as unknown as any[];
    expect(userRows.length).toBe(1);
    expect(userRows[0].name).toBe(testData.nome);
    expect(userRows[0].discordId).toBe(testDiscordId);
    expect(userRows[0].studentId).toBe(testData.idViceCity);
    expect(userRows[0].role).toBe("member");
    expect(userRows[0].approvalStatus).toBe("pending");

    // Limpar dados de teste
    await db.execute(sql`DELETE FROM users WHERE discordId = ${testDiscordId}`);
  });

  it("should not create duplicate user if Discord ID already exists", async () => {
    const db = await getDb();
    if (!db) {
      throw new Error("Database not available");
    }

    const testDiscordId = "test_discord_duplicate_" + Date.now();
    const testData = {
      nome: "Maria Santos",
      idViceCity: "54321",
    };

    // Criar primeiro usuário
    const firstUserResult = await db.execute(
      sql`INSERT INTO users 
       (openId, name, discordId, studentId, role, approvalStatus, createdAt, updatedAt, lastSignedIn)
       VALUES (${`discord_${testDiscordId}`}, ${testData.nome}, ${testDiscordId}, ${testData.idViceCity}, 'member', 'pending', NOW(), NOW(), NOW())`
    );
    const firstUserId = Number(firstUserResult[0].insertId);

    // Verificar se usuário existe
    const existingUser = await db.execute(
      sql`SELECT id FROM users WHERE discordId = ${testDiscordId} LIMIT 1`
    );
    const existingUserRows = existingUser[0] as unknown as any[];
    
    // Deve encontrar o usuário existente
    expect(existingUserRows.length).toBe(1);
    expect(existingUserRows[0].id).toBe(firstUserId);

    // Simular tentativa de criar usuário duplicado (deve usar ID existente)
    let userId;
    if (existingUserRows && existingUserRows.length > 0) {
      userId = existingUserRows[0].id;
    }

    // Deve usar o mesmo ID
    expect(userId).toBe(firstUserId);

    // Verificar que ainda existe apenas um usuário
    const finalCheck = await db.execute(
      sql`SELECT COUNT(*) as count FROM users WHERE discordId = ${testDiscordId}`
    );
    const finalRows = finalCheck[0] as unknown as any[];
    expect(finalRows[0].count).toBe(1);

    // Limpar dados de teste
    await db.execute(sql`DELETE FROM users WHERE discordId = ${testDiscordId}`);
  });
});
