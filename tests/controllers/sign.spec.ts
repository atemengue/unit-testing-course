import { describe, expect, it } from 'vitest';
import { SignUpController } from '../../src/app/controllers/signup';


describe("SignUp controller", () => {
  it("Should return 400 if no name is provided", () => {
    
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        email: 'user@rmail.com',
        password: '23123',
        passwordConfirmation: '23123'
      }
    }
    const httpResponse = sut.handle(httpRequest);

    console.log(httpResponse);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: name"));
  });

  it("Should return 400 if no email is provided", () => {
    
    const sut = new SignUpController();

    const httpRequest = {
      body: {
        name: 'user',
        password: '23123',
        passwordConfirmation: '23123'
      }
    }
    const httpResponse = sut.handle(httpRequest);

    console.log(httpResponse);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error("Missing param: email"));
  });

});