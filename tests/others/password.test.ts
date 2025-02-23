import { describe, expect, it } from 'vitest';
import { passwordChecker } from '../../src/app/others/password';




describe.skip("password checker tests Suite", () => {
  // Functional Requirement: The password should be considered invalid if its length is less than 8 characters.
  // Functional Requirement: The password should be considered invalid if it does not contain any uppercase letter.
  // Functional Requirement: The password should be considered valid if it contains at least one uppercase letter.
  // Functional Requirement: The password should be considered invalid if it does not contain any lowercase letter.
  it("Should return password is invalid if with no lower case letter", () => {
    const password = '1234ABCD';
    const response = "invalid password";
    const SUT = passwordChecker(password);
    expect(SUT).toMatch(response);
  });
});
