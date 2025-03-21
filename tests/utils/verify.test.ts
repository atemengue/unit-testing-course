import { describe, expect, it } from 'vitest';
import { verify, verifyEmail, verifyName, verifyPassword } from '../../src/utils/verify';

describe('verifyName', () => {
  it('should return true for names with 8 or more characters', () => {
    expect(verifyName('abcdefgh')).toBe(true);
  });

  it('should return false for names with less than 8 characters', () => {
    expect(verifyName('abc')).toBe(false);
  });
});

describe('verifyPassword', () => {
  it('should return true for passwords with upper case, lower case, and number', () => {
    expect(verifyPassword('Password1')).toBe(true);
  });

  it('should return false for passwords without upper case', () => {
    expect(verifyPassword('password1')).toBe(false);
  });

  it('should return false for passwords without lower case', () => {
    expect(verifyPassword('PASSWORD1')).toBe(false);
  });

  it('should return false for passwords without number', () => {
    expect(verifyPassword('Password')).toBe(false);
  });
});

describe('verifyEmail', () => {
  it('should return true for valid email addresses', () => {
    expect(verifyEmail('test@example.com')).toBe(true);
  });

  it('should return false for invalid email addresses', () => {
    expect(verifyEmail('test@.com')).toBe(false);
  });
});

describe('verify', () => {
  it('should return true for valid name, password, and email', () => {
    expect(verify('username', 'Password1', 'test@example.com')).toBe(true);
  });

  it('should return false for invalid name, password, or email', () => {
    expect(verify('user', 'Password1', 'test@example.com')).toBe(false);
    expect(verify('username', 'password', 'test@example.com')).toBe(false);
    expect(verify('username', 'Password1', 'test@.com')).toBe(false);
  });
});