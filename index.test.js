import { describe, expect, it } from 'vitest';
import { sum } from '.';


describe('Sum tests suite', () => {

  it('Should return 0 if array is empty',() => {
    expect(sum([])).toBe(0);
  });

  it("Should return first elemetn if array length is 1", () => {
    expect(sum([1])).toBe(1);
  });

  it("Should return sum of elements if array length is greathen than 1", () => {
    expect(sum([1,2,3])).toBe(6);
  })

})