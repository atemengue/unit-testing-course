import { describe, expect, it } from 'vitest';

import { fetchData } from '../../src/app/async/async';



// describe("Async Code Testing", () => {
//   it("Should should return a promise a resolve an array of numbers", async () => {
//       const result = await fetchData();
//       expect(Array.isArray(result)).toBeTruthy();
//       expect(Array.length).toBeGreaterThan(0);
//   })
// })


describe("Async Code Testing", () => {
  it("Should should return a promise with reject operation", async () => {

    try {
      const result = await fetchData();
    } catch (error) {
      expect(error).toHaveProperty('reason');
      expect(error.reason).toMatch(/fail/i)
    }

  })
})