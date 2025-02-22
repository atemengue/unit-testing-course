import { describe, expect, it } from 'vitest';
import { passwordChecker } from '../../src/app/others/password';


describe.skip("password checker tests Suite", () => {
  it("Should return password is invalid if length is less than 8 chars", () => {
    const password = "abcd123";
    const response = "invalid password";
    const SUT = passwordChecker(password);
    expect(SUT).toMatch(response)
  });

  it("Should return password is invalid if with no upper case letter", () => {

    const password = '1234abcd';
    const response = "invalid password";
    const SUT = passwordChecker(password);
    expect(SUT).toMatch(response);

  })

  it("Should return password is valid has upper case letter", () => {

    const password = '1234Mbcd';
    const response = "password valid";
    const SUT = passwordChecker(password);
    expect(SUT).toMatch(response);

  })

  it("Should return password is invalid if with no lower case letter", () => {

    const password = '1234ABCD';
    const response = "invalid password";
    const SUT = passwordChecker(password);
    expect(SUT).toMatch(response);

  })
})