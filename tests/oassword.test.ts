  // Functional Requirement: The Password Checker should validate passwords based on the following rules:
  // 1. The password should not be empty.
  // 2. The password should have a minimum length of 8 characters.
  // 3. The password should contain at least one uppercase letter.
  // 4. The password should contain at least one lowercase letter.
  // 5. The password should contain at least one number.

  // {
  //   isValid: true,
  //   reasons: ["Password is too short!", "Upper case letter required"]
  // }
  


  import { beforeEach, describe, expect, it } from 'vitest';
import { PasswordClass, PasswordErros } from '../src/app/pass_checker/password';


  describe("Password Checker Suite test", () => {

    let SUT : PasswordClass;

    beforeEach(() => {
      SUT = new PasswordClass();

    })

    it("Should return false is password is empty", () => {

      const password = "";
      const result =  SUT.checker(password);
      expect(result.isValid).toBe(false);
      expect(result.reasons).contain(PasswordErros.SHORT);
    });
    
    it("Should return false is passord length < 8",() => {
      const password = "asdasd";
      const  actual = SUT.checker(password);
      expect(actual.isValid).toBe(false);
      expect(actual.reasons).contain(PasswordErros.SHORT);
    })

    it("upper case",() => {
      const password = "123456arfcvrf";
      const actual = SUT.checker(password)
      expect(actual.isValid).toBe(false);
      expect(actual.reasons).contain(PasswordErros.NO_UPPER_CASE);
    })

    it("Lowercase case",() => {
      const password = "12345AAAASD";
      const actual = SUT.checker(password)
      expect(actual.isValid).toBe(false);
      expect(actual.reasons).contain(PasswordErros.NO_LOWERCASE);
    })

    it("has number",() => {
      const password = "adsdasdAAAASD";
      const actual = SUT.checker(password)
      expect(actual.isValid).toBe(false);
      expect(actual.reasons).contain(PasswordErros.NO_NUMBER);
    })

  })