import bcrypt from 'bcrypt';
import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SignInController from '../../src/controllers/signin.controller';
import { NotFoundError, UnauthorizedError } from '../../src/errors';
import User from '../../src/models/user';

vi.mock(import("bcrypt"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
      compare: vi.fn()
  }
})

vi.mock('../../src/models/user.ts', () => {
  return {
    default: {
      findOne: vi.fn()
    }
  }
});

vi.mock(import("jsonwebtoken"), async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    sign: vi.fn().mockReturnValue('mocked-access-token')
  }
})


describe("SignInController", () => {

  let sut: SignInController;

  beforeEach(() => {
    sut = new SignInController();
  });

  afterEach(() =>{
    vi.clearAllMocks();
  })

  describe("handle", () => {
    it("should return username and password required", async () => {

      // Arrange
        const password = "";
        const name = "";
        const MockAuth = { password, name }
        const req = {
          body: MockAuth
        } as Request
      // Act

      const actual = await sut.handle(req);

      // Assert 
      expect(actual.status).toBe(400);
      expect(actual.body.message).toMatch(/required/i)

    });
    it("should thrown erros user not found", async () => {

      // Arrange
      const password = "1234acdf$^";
      const name = 'usertest7';
      const MocKAuth = { password, name };
      const req = {
        body: MocKAuth
      } as Request;
      
      // Mock method
      (User.findOne as any).mockResolvedValue(null);
      // Act
      // Assert
      await expect(sut.handle(req)).rejects.toThrow(NotFoundError);

    });
    it("should throw errors invalid users credentials", async () => {

      // Arrange
      const password = "1234acdf$^";
      const name = 'usertest7';
      const MocKAuth = { password, name };
      const req = {
        body: MocKAuth
      } as Request;
      
      // Mock method
      (User.findOne as any).mockResolvedValue(true);
      vi.spyOn(bcrypt, 'compare').mockImplementation(() => false) as any

      await expect(sut.handle(req)).rejects.toThrow(UnauthorizedError);

    });
    it("should authentication successful user", async () => {
      
        // Arrange
        const password = "1234acdf$^";
        const name = 'usertest7';
        const token =  'mocked-access-token';
        const MocKAuth = { password, name };
        const req = {
          body: MocKAuth
        } as Request;
        
        // Mock method
        (User.findOne as any).mockResolvedValue(true);
        vi.spyOn(bcrypt, 'compare').mockImplementation(() => true) as any
        vi.spyOn(JWT, 'sign').mockImplementation(() => token) as any;

        // Act
        const actual = await sut.handle(req);
        console.log(actual);
        // Assert 
        expect(actual.status).toBe(200);
        expect(actual.body.token).toBe(token);
        expect(actual.body.message).toMatch(/successful/i);

    });
    it.todo("should throw erros reject handle execution");
  })


})