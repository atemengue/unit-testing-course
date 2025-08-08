import bcrypt from 'bcrypt';
import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SignInController from '../../src/controllers/signin.controller';
import { NotFoundError, UnauthorizedError } from '../../src/errors';
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
    it("doit me retourner name et password required si les credentials sont incorrects", async () => {

      // Arrange
      const name = "";
      const password = "";

      const req = {
        body: {name , password}
      } as Request;
      // Act
      const actual = await sut.handle(req);
      // Assert
      expect(actual.status).toBe(400);
      expect(actual.body.message).toMatch(/required/i)

    });
    // test case 03
    it("doit retourner user not found si le user n'existe pas", async () => {

    // Arrange
      const name = "antoine-junoir";
      const password = "testACV136#";
      const dataReq = { name, password };
      const req = {
        body: dataReq
      } as Request;

      // mock findOne
      (User.findOne as any).mockResolvedValue(false);

      await expect(sut.handle(req)).rejects.toThrow(NotFoundError);


    });
    // test case 04
    it("doit retourner Invalid Credentials", async () => {
      // Arrange
      const name = "antoine-junoir";
      const password = "testACV136#";
      const dataReq = { name, password };
      const req = {
        body: dataReq
      } as Request;

      // Mock Methods
      (User.findOne as any).mockResolvedValue(true);
      vi.spyOn(bcrypt, 'compare').mockImplementation(() => false);

      // Act
      await expect(sut.handle(req)).rejects.toThrow(UnauthorizedError)

    })

  })

})