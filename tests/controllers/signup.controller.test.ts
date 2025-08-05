import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SignUpController from '../../src/controllers/signup.controller';
import User from '../../src/models/user';
import { hashed } from '../../src/utils/hashed-password';
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
    sign: vi.fn().mockReturnValue('access-token')
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
  it("doit creer un utilisateur et retourner un token et un status 200", async () => {

    // Arrange
    const name = "jamesjunoir";
    const password = "ABC12345#@";
    const email = "james@test.com";
    const bodyData = { name, email, password}
    const hashedPassord = "hashed-password93#"

    const req = {
      body: bodyData
    } as Request  

    // mock
    vi.mocked(verify).mockReturnValue(true);
    vi.mocked(hashed).mockResolvedValue(hashedPassord);
    (User.create as any).mockResolvedValue({
      name: name,
      email: email,
      password: hashedPassord
    });

    vi.spyOn(JWT, 'sign').mockImplementation((accessToken) => accessToken) as any;


    // Act
    const actual = await sut.handle(req);

    // Assert
    expect(actual.status).toBe(200);
    expect(actual.body).toBe("access-token");
    expect(User.create).toHaveBeenCalledTimes(1);
    expect(verify).toHaveBeenCalledTimes(1);
    expect(verify).toHaveBeenCalledWith(name, password, email)


  });
  
  // test case 2
  it.todo("doit retourner une erreur si la creation d'un utilisateur echoue status 500");


})