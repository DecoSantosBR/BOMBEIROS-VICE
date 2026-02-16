import { describe, it, expect } from "vitest";
import * as db from "./db";

describe("Recruitment Application Insert", () => {
  it("should insert recruitment application successfully", async () => {
    const testApplication = {
      discordId: "TEST_DISCORD_ID_" + Date.now(),
      discordUsername: "test_user",
      nome: "Test User",
      idViceCity: "99999",
      telefone: "000-000",
      idade: "25",
      interesse: "Test interest",
      possuiMicrofone: "sim",
      regrasIlegais: "Test answer 1",
      ordemSuperior: "Test answer 2",
      tiroteio: "Test answer 3",
      multiplasOcorrencias: "Test answer 4",
    };

    const applicationId = await db.createRecruitmentApplication(testApplication);
    
    expect(applicationId).toBeGreaterThan(0);
    console.log("✅ Application inserted successfully with ID:", applicationId);
  });
});
