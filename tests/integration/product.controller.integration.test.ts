import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { seedDatabase, setupTestDB, tearDownTestDB } from '../../src/config/setup';
import ProductController from '../../src/controllers/product.controller';
import Product from '../../src/models/product';
import { InventoryService } from '../../src/services/inventory.service';
import ProductService from '../../src/services/product.service';

describe("Product Controller Integration Tests Suites", () => {

  let sut : ProductController;
  let productService: ProductService;
  let inventoryService: InventoryService;

  beforeAll(async () => {
    await setupTestDB();
    await seedDatabase();
  });

  afterAll(async () => {
    await tearDownTestDB()
  })

  describe("Create", () => {

    beforeEach(() => {
      productService = new ProductService();
      inventoryService = new InventoryService();
      
      sut = new ProductController(productService, inventoryService);
    })

    it("doit creer un produit et mettre a jour d'inventaire", async () => {

      // Arrange
      const products = await Product.find();


      // Act


      // Assert

    })

  })

})