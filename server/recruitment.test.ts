import { describe, it, expect } from "vitest";
import { appRouter } from "./routers";
import type { Context } from "./_core/context";

describe("Recruitment System", () => {
  // Mock context for public procedures
  const mockPublicContext: Context = {
    req: {} as any,
    res: {} as any,
    user: undefined,
  };

  const caller = appRouter.createCaller(mockPublicContext);

  it.skip("should submit recruitment application successfully", async () => {
    const result = await caller.recruitment.submit({
      discordId: "123456789",
      discordUsername: "testuser#1234",
      nome: "João Silva",
      idViceCity: "12345",
      telefone: "555-1234",
      idade: "25",
      interesse: "Quero ajudar a comunidade",
      possuiMicrofone: "sim",
      regrasIlegais: "Sim, estou ciente",
      ordemSuperior: "Não, sempre obedeceria",
      tiroteio: "Aguardaria o tiroteio acabar",
      multiplasOcorrencias: "Atenderia a primeira ocorrência",
    });

    expect(result.success).toBe(true);
    expect(result.applicationId).toBeGreaterThan(0);
  });

  it("should reject application without required fields", async () => {
    await expect(
      caller.recruitment.submit({
        discordId: "",
        discordUsername: "",
        nome: "",
        idViceCity: "",
        telefone: "",
        idade: "",
        possuiMicrofone: "sim",
      })
    ).rejects.toThrow("Campos obrigatórios faltando");
  });

  it("should reject application without microphone", async () => {
    await expect(
      caller.recruitment.submit({
        discordId: "123456789",
        discordUsername: "testuser#1234",
        nome: "João Silva",
        idViceCity: "12345",
        telefone: "555-1234",
        idade: "25",
        possuiMicrofone: "nao",
      })
    ).rejects.toThrow("É obrigatório possuir microfone");
  });
});
