import { describe, expect, it } from 'vitest';
import { L } from 'vitest/dist/chunks/reporters.d.BFLkQcL6';
import { verify, verifyEmail, verifyName, verifyPassword } from '../../src/utils/verify';
describe("verifyName Test Suite", () => {

  it("doit me retourner false si la taille du name < 8", () => {
    expect(verifyName("joe")).toBe(false);
  })
  it("doit me retourner true si la  taille name >= 8", () => {
    expect(verifyName("antoine-regis")).toBe(true);
  });
});

describe("VerifyEmail Test Suite", () => {
  it("doit me retourner false si email est incorrect", () => {
    expect(verifyEmail("test@test")).toBe(false);
  });
  it("doit me retourner true is email est correct", () => {
    expect(verifyEmail("test@test.com")).toBe(true);
  })
});

describe("verifyPassword test suite", () => {
  it("doit me retourner false si il manque une lettre majuscule", () => {
    expect(verifyPassword("password1")).toBe(false);
  });
  it("doit me retourner false si il manque une lettre miniscule", () => {
    expect(verifyPassword("PASSWORD1")).toBe(false);
  });
  it("doit me retourner false si il manque un chiffre", () => {
     expect(verifyPassword("PASSword")).toBe(false);
  });
  it("doit me retourner true si le password contient une maj, une min, un chiffre", () => {
     expect(verifyPassword("Password1")).toBe(true);
  });

describe("Verify test suite", () => {

  it("doit me retourner true pour un name valide, un password valide et un email valide", () => {
    expect(verify("atemengue","PASSword1", "regis.atemengue@test.com")).toBe(true);
  });
  it("doit retourner false is name invalide ou password invalide ou email valide", () => {
    expect(verify("atemengue","password", "regis.atemengue@test.com")).toBe(false);
    expect(verify("atemengue","PASSword1", "regis.atemengue@test")).toBe(false);
    expect(verify("joe","PASSword1", "regis.atemengue@test.com")).toBe(false);
  })

})

})