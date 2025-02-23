
import { describe, expect, it } from 'vitest';
import { sum } from '../../src/app/others/other';
/**
 * Test suite for the sum function.
 *
 * Requirements:
 * - Should return 0 if the array is empty.
 * - Should return the first element if the array length is 1.
 * - Should return the sum of elements if the array length is greater than 1.
 * - Should return the sum of negative numbers.
 * - Should return 0 if all elements are 0.
 * - Should return the sum of decimal numbers.
 * - Should return the sum of large numbers.
 */

describe.skip('Sum tests suite', () => {

  it('Should return 0 if array is empty',() => {
    expect(sum([])).toBe(0);
  });

  it("Should return first element if array length is 1", () => {
    expect(sum([1])).toBe(1);
  });

  it("Should return sum of elements if array length is greater than 1", () => {
    expect(sum([1, 2, 3])).toBe(6);
  });

  it("Should return the sum of negative numbers", () => {
    expect(sum([-1, -2, -3])).toBe(-6);
  });

  it("Should return 0 if all elements are 0", () => {
    expect(sum([0, 0, 0, 0])).toBe(0);
  });

  it("Should return the sum of decimal numbers", () => {
    expect(sum([1.5, 2.5, 3.5])).toBe(7.5);
  });

  it("Should return the sum of large numbers", () => {
    expect(sum([1000000, 2000000, 3000000])).toBe(6000000);
  });

});
