import { describe, expect, it } from 'vitest';
import { PasswordChecker, PasswordErros } from '../../src/app/pass_checker/PasswordChecker';




describe('Password Checker Suite Test', () => {

  // Functional Requirement: The Password Checker should validate passwords based on the following rules:
  // 1. The password should not be empty.
  // 2. The password should have a minimum length of 8 characters.
  // 3. The password should contain at least one uppercase letter.
  // 4. The password should contain at least one lowercase letter.
  // 5. The password should contain at least one number.

  let SUT : PasswordChecker;

  beforeEach(() => {
    SUT = new PasswordChecker();
  })

  it("Should return false if password is empty", () => {
    const password = "";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result.isValid).toBe(false);
    expect(expect_result.reasons).toContain("Password is too short!")
  });
  
  it("Should return false if password length is less than 8", () => {
    const password = "123adda";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result.isValid).toBe(false);
    expect(expect_result.reasons).toContain(PasswordErros.SHORT)
  });

  it("Should return false if password has no uppercase letter",() => {
    const password = "1234abcde";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result.isValid).toBe(false);
    expect(expect_result.reasons).toContain(PasswordErros.NO_UPPER_CASE)
  });

  it("Should return false if password has no lowercase letter",() => {
    const password = "1234ABCDE";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result.isValid).toBe(false);
    expect(expect_result.reasons).toContain(PasswordErros.NO_LOWERCASE)
  });

  it("Should return true if password is correct", () => {
    const password = "1234ADecf";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result.isValid).toBe(true);
    expect(expect_result.reasons.length).toBe(0)
  });

  it("Should return false if password has no number", () => {
    const password = "abcdABCD";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result.isValid).toBe(false);
    expect(expect_result.reasons).toContain(PasswordErros.NO_NUMBER);
  })

})
