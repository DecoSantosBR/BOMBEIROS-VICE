import { describe, it, expect, beforeAll } from "vitest";
import { appRouter } from "./routers";
import * as db from "./db";

describe("certificates.generateAndDownload", () => {
  let testUser: any;
  let testCourse: any;

  beforeAll(async () => {
    // Criar usuário de teste (instrutor)
    const dbInstance = await db.getDb();
    if (!dbInstance) {
      throw new Error("Database not available");
    }

    const { users, courses } = await import("../drizzle/schema");
    
    // Criar usuário instrutor de teste
    await dbInstance.insert(users).values({
      openId: "test-openid-cert-" + Date.now(),
      discordId: "test-discord-id-cert-" + Date.now(),
      name: "Instrutor Teste",
      email: "instrutor.teste@test.com",
      studentId: "TEST-" + Date.now(),
      rank: "Capitão",
      role: "instructor",
      approvalStatus: "approved",
    });
    
    // Buscar usuário criado
    const { eq } = await import("drizzle-orm");
    const [user] = await dbInstance.select().from(users).where(eq(users.email, "instrutor.teste@test.com"));
    testUser = user;

    // Criar curso de teste
    const courseId = "test-course-cert-" + Date.now();
    await dbInstance.insert(courses).values({
      id: courseId,
      nome: "Curso de Teste para Certificado",
      descricao: "Curso de teste",
      duracao: "10 horas",
      requisitos: "Nenhum",
      imageUrl: "https://example.com/image.png",
    });
    
    // Buscar curso criado
    const { eq: eqCourse } = await import("drizzle-orm");
    const [course] = await dbInstance.select().from(courses).where(eqCourse(courses.id, courseId));
    testCourse = course;
  });

  it("deve gerar certificado e retornar URL do S3", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: testUser,
    });

    const result = await caller.certificates.generateAndDownload({
      studentName: "João Silva Teste",
      studentId: "12345",
      courseName: "Curso de Formação de Bombeiros",
      instructorName: "Instrutor Teste",
      instructorRank: "Capitão",
      auxiliar: "Pedro Costa",
      auxiliarMatricula: "67890",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("sucesso");
    expect(result.certificateUrl).toBeDefined();
    expect(result.certificateUrl).toContain("https://");
    expect(result.certificateUrl).toContain(".png");
  });

  it("deve rejeitar se usuário não for instrutor ou admin", async () => {
    const dbInstance = await db.getDb();
    if (!dbInstance) {
      throw new Error("Database not available");
    }

    const { users } = await import("../drizzle/schema");
    
    // Criar usuário membro (não instrutor)
    const memberEmail = "membro.teste@test.com";
    await dbInstance.insert(users).values({
      openId: "test-openid-member-" + Date.now(),
      discordId: "test-member-" + Date.now(),
      name: "Membro Teste",
      email: memberEmail,
      studentId: "MEMBER-" + Date.now(),
      rank: "Soldado",
      role: "member",
      approvalStatus: "approved",
    });
    
    // Buscar usuário criado
    const { eq: eqMember } = await import("drizzle-orm");
    const [memberUser] = await dbInstance.select().from(users).where(eqMember(users.email, memberEmail));

    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: memberUser,
    });

    await expect(
      caller.certificates.generateAndDownload({
        studentName: "João Silva",
        studentId: "12345",
        courseName: "Curso Teste",
        instructorName: "Instrutor",
        instructorRank: "Capitão",
      })
    ).rejects.toThrow("Apenas instrutores e administradores podem gerar certificados");
  });

  it("deve salvar certificado no banco de dados", async () => {
    const caller = appRouter.createCaller({
      req: {} as any,
      res: {} as any,
      user: testUser,
    });

    const result = await caller.certificates.generateAndDownload({
      studentName: "Maria Santos Teste",
      studentId: "54321",
      courseName: "Curso de Primeiros Socorros",
      instructorName: "Instrutor Teste",
      instructorRank: "Major",
    });

    expect(result.success).toBe(true);

    // Verificar se foi salvo no banco
    const dbInstance = await db.getDb();
    if (!dbInstance) {
      throw new Error("Database not available");
    }

    const { certificates } = await import("../drizzle/schema");
    const { eq, and } = await import("drizzle-orm");

    const savedCerts = await dbInstance
      .select()
      .from(certificates)
      .where(
        and(
          eq(certificates.studentName, "Maria Santos Teste"),
          eq(certificates.studentId, "54321")
        )
      );

    expect(savedCerts.length).toBeGreaterThan(0);
    expect(savedCerts[0].certificateUrl).toBe(result.certificateUrl);
  });
});
