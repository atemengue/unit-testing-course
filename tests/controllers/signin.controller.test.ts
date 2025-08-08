import bcrypt from 'bcrypt';
import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SignInController from '../../src/controllers/signin.controller';
import User from '../../src/models/user';


vi.mock('../../src/models/user.ts', () => {
  return {
    default: {
      findOne: vi.fn()
    }
  }
})

vi.mock(import('bcrypt'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    compare: vi.fn()
  }
});

vi.mock(import('jsonwebtoken'), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    sign: vi.fn().mockReturnValue('access-token')
  }
})



describe("SignInController", () => {

  let sut : SignInController;

  beforeEach(() => {
    sut =  new SignInController();
  });

  afterEach(() => {
    vi.clearAllMocks();
  })

  describe("handle tests suites", () => {

    // test case 01
    it("doit me retourner Authentication successful avec un status 200 et un token", async () => {

      // Arrange
      const name = "antoine-junoir";
      const password = "testACV136#";
      const dataReq = { name, password };
      const token = 'secret-token';
      const req = {
        body: dataReq
      } as Request;

      // Mock Methods

      (User.findOne as any).mockResolvedValue(true);
      vi.spyOn(bcrypt, 'compare').mockImplementation(() => true);
      vi.spyOn(JWT, 'sign').mockImplementation(() => token);

      // Act
      const actual = await sut.handle(req);

      // Assert
      expect(actual.status).toBe(200);
      expect(actual.body.token).toBe(token);
      expect(actual.body.message).toMatch(/successful/i);


    });
    // test case 02
    it.todo("doit me retourner name et password required si les credentials sont incorrects");
    // test case 03
    it.todo("doit retourner user not found si le user n'existe pas");
    // test case 04
    it.todo("doit retourner Invalid Credentials")

  })

})