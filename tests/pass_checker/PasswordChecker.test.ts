import { describe, expect, it } from 'vitest';
import { PasswordChecker } from '../../src/app/pass_checker/PasswordChecker';


describe('Password Checker Suite Test', () => {

  let SUT : PasswordChecker;

  beforeEach(() => {
    SUT = new PasswordChecker();
  })

  it("Should return false false it password is empty", () => {
    const password = "";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result).toBe(false);

  });

  it("Should return false if password length less than 8", () => {
    const password = "123adda";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result).toBe(false);

  });

  it("Should return  false if password has no upper cas letter",() => {
    const password = "1234abcde";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result).toBe(false);
  });

  it("Should return false if password has no lowercase cas letter",() => {
    const password = "1234ABCDE";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result).toBe(false);
  });

  it("Should return true if password is correct", () => {
    const password = "1234ADecf";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result).toBe(true);
  });

  it("Should return false if password has not number", () => {
    const password = "abcdABCD";
    const expect_result = SUT.checkPassword(password);
    expect(expect_result).toBe(false);
  })

})
