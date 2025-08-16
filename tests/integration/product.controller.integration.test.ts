import { Request, Response } from 'express';
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { seedDatabase, setupTestDB, tearDownTestDB } from '../../src/config/setup';
import ProductController from '../../src/controllers/product.controller';
import Category from '../../src/models/category';
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

      const coffeChaudCategory = await Category.findOne({
        name: "Coffee Chaud"
      });

      // Arrange
      const produtData = {
        name: "Cafe au Chocolat Chaud",
        description: "Il est chaud le cafe",
        price: 750,
        stock: 8,
        imageUrl: "image-url",
        categoryId: coffeChaudCategory?.id
      }

      const req = {
        body: produtData
      } as Request;

      const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
      } as unknown as Response;


      // Act
      await sut.create(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);


      // Assert sur le product
      const newProduct = await productService.getByName("Cafe au Chocolat Chaud");
      const products = await productService.lists();

      expect(produtData.name).toBe(newProduct?.name);
      expect(produtData.price).toBe(newProduct?.price);
      expect(products.length).toBe(2);

      // Assert sur inventory
      const id  = newProduct?.id as unknown as string;

      const stock = await inventoryService.checkInventory(id);

      expect(stock.isAvailable).toBeTruthy();
      expect(stock.quantity).toBe(8);





    })

  })

})