import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import SignInController from '../../src/controllers/signin.controller';


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
    it("doit me retourner Authentication successful avec un status 200 et un token");
    // test case 02
    it.todo("doit me name et password required si les credentials sont incorrects");
    // test case 03
    it.todo("doit retourner user not found si le user n'existe pas");
    // test case 04
    it.todo("doit retourner Invalid Credentials")

  })

})