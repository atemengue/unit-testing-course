import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SignUpController from '../../src/controllers/signup.controller';
import User from '../../src/models/user';
import { hashed } from '../../src/utils/hashed-password';
import * as verifyUtils from '../../src/utils/verify';

vi.mock("../../src/utils/verify.ts", async() => {
  const actual = await vi.importActual<typeof import('../../src/utils/verify')>('../../src/utils/verify.ts');
  return {
    ...actual,
    verify: vi.fn()
  }
});

vi.mock("../../src/utils/hashed-password.ts");

vi.mock(import("jsonwebtoken"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    sign: vi.fn().mockReturnValue('mocked-access-token')
  }
})

vi.mock("../../src/models/user.ts", () => ({
  default: {
    create: vi.fn()
  }
}));

describe("SignUpController", () => {

  let sut: SignUpController;


  beforeEach(()=> {
    sut = new SignUpController();
  });
 
  afterEach(() => {
    vi.clearAllMocks();
  })
  
  
  it("should return created user", async () => {
    // Arrange
      const name = 'regisatemengue';
      const password = 'ABC1245$%$';
      const email = "test@email.com";
      const hashedPassword = 'mocked-hashed-password';
      const accessToken = 'mocked-access-token';
      const MockUser = { email, name, password: password }

      const req = {
        body: MockUser
      } as Request

      // mock
      vi.mocked(verifyUtils.verify).mockReturnValue(true);
      vi.mocked(hashed).mockResolvedValue(hashedPassword);
      vi.spyOn(JWT, 'sign').mockImplementation((accessToken) => accessToken) as any;
      (User.create as any).mockResolvedValueOnce({
        name: name,
        password: hashedPassword,
        email: email
      });

    // Act
      const actual = await sut.handle(req);

    // Assert
    expect(actual.status).toBe(200);
    expect(actual.body).toBe(accessToken);
    expect(User.create).toHaveBeenCalledTimes(1);
    // expect(User.create).toHaveBeenCalledWith({
      // email, password, 
    // });
  });
  it("should return error when user create occurence failed", async () => {

    // Arrange
    const name = 'regisatemengue';
    const password = 'ABC1245$%$';
    const email = "test@email.com";
    const hashedPassword = 'mocked-hashed-password';
    const accessToken = 'mocked-access-token';
    const MockUser = { email, name, password: password }

    const req = {
      body: MockUser
    } as Request

    vi.mocked(verifyUtils.verify).mockReturnValue(false);

    const actual = await sut.handle(req);
    // Assert

    expect(actual.status).toBe(500);
    // and elements
  });

})