import { genSalt, hash } from 'bcrypt';
import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { afterEach } from 'node:test';
import { afterAll, beforeEach, describe, it, vi } from 'vitest';
import SignInController from '../../src/controllers/signin.controller';
import User from '../../src/models/user';
import * as verifyUtils from '../../src/utils/verify';

vi.mock("../../src/utils/verify.ts", async() => {
  const actual = await vi.importActual<typeof import('../../src/utils/verify')>('../../src/utils/verify.ts');
  return {
    ...actual,
    verify: vi.fn()
  }
});

vi.mock(import("jsonwebtoken"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    sign: vi.fn().mockReturnValue('mocked-access-token')
  }
})



vi.mock('bcrypt', () => ({
  genSalt: vi.fn().mockResolvedValue(10),
  hash: vi.fn().mockResolvedValue('mocked-hashed-password')

}))



vi.mock("../../src/models/user.ts", () => ({
  default: {
    create: vi.fn()
  }
}));

describe("SignUpController", () => {

  let sut: SignInController;


  beforeEach(()=> {
    sut = new SignInController();
  });
 
  afterEach(() => {
    vi.clearAllMocks();
  })
  
  
  it("should return created user", async () => {
    // Arrange
      const name = 'regisatemengue';
      const passowrd = 'ABC1245$%$';
      const email = "test@email.com";
      const hashedPassword = 'mocked-hashed-password';
      const accessToken = 'mocked-access-token';
      const MockUser = { email, name, passowrd }

      const req = {
        body: MockUser
      } as Request

      // mock
      vi.mocked(verifyUtils.verify).mockReturnValue(true);
      vi.spyOn(JWT, 'sign').mockImplementation((accessToken) => accessToken) as any;
      (genSalt as any).mockResolvedValue(10)
      // (hash as any).mockResolvedValue(hashedPassword)
      // vi.mocked(hash).mockResolvedValue(hashedPassword);
      //vi.mocked(hash).mockResolvedValue(hashedPassword);

      // (User.create as any).mockResolvedValue(MockUser);

    // Act
      const actual = sut.handle(req);

    // Assert

  });
  it.todo("should return error when user create occurence failed");

})