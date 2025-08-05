import { Request } from 'express';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SignUpController from '../../src/controllers/signup.controller';
import User from '../../src/models/user';
import { verify } from '../../src/utils/verify';




vi.mock("../../src/models/user.ts", () => ({
  default: {
    create: vi.fn()
  }
}));

vi.mock("../../src/utils/hashed-password.ts");

vi.mock('../../src/utils/verify.ts', async () => {
  const actual = await vi.importActual<typeof import('../../src/utils/verify')>('../../src/utils/verify.ts')
  return {
    ...actual,
    verify: vi.fn()
  }
});

vi.mock(import("jsonwebtoken"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    sign: vi.fn().mockReturnValue('mocked-access-token')
  }
})





describe("SignUpController", () => {

  let sut: SignUpController;

  beforeEach(() => {
    sut = new SignUpController();
  });

  afterEach(() => {
    vi.clearAllMocks();
  })

  // test case 1
  it("doit creer un utilisateur et retourner un token et un status 200", () => {

    // Arrange
    const name = "jamesjunoir";
    const password = "ABC12345#@";
    const email = "james@test.com";
    const bodyData = { name, email, password} 

    const req = {
      body: bodyData
    } as Request  

    // mock


    // Act
    //sut.handle(req)

    // Assert

  });
  
  // test case 2
  it.todo("doit retourner une erreur si la creation d'un utilisateur echoue status 500");


})