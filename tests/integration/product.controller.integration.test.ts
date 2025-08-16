import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { seedDatabase, setupTestDB, tearDownTestDB } from '../../src/config/setup';

describe("Product Controller Integration Tests Suites", () => {


  beforeAll(async () => {
    await setupTestDB();
    await seedDatabase();
  });

  afterAll(async () => {
    await tearDownTestDB()
  })

  describe("Create", () => {
    

    it("doit creer un produit et mettre a jour d'inventaire", () => {

      // Arrange


      // Act


      // Assert

    })

  })

})