import { Request, Response, response } from 'express';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ProductController from '../../src/controllers/product.controller';
import CategoryModel from '../../src/models/category';
import { InventoryService } from '../../src/services/inventory.service';
import ProductService from '../../src/services/product.service';
import { setupTestEnvironment } from '../config/setup';

// 1. Setup Memory Database
// 2. pattern AAA
// 2. SUT beforeEach
setupTestEnvironment();


describe.only("Create Product", () => {
  
  let sut: ProductController;
  let productService: ProductService;
  let inventoryService: InventoryService;

  beforeEach(() => {
    
    productService = new ProductService();
    inventoryService = new InventoryService();
  
    sut = new ProductController(productService, inventoryService);
  });
  
  it("Should create product and create inventory", async () => {

    // Arrange
    const category = await CategoryModel.findOne({
      name: 'Coffee'
    });

    const mockProduct  = {
      name: 'caffe au lait',
      descrption: 'la description du cafe au lait',
      price: 2000,
      stock: 200,
      image: 'imageUrl',
      categoryId: category?.id
    };

    const req = {
      body: mockProduct
    } as Request

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as unknown as Response;

    // Act
    await sut.create(req, res);

    // Assert

    expect(res.status).toHaveBeenCalledWith(201)
    // Assert Product
  
    const newProduct = await productService.getByName("caffe au lait");

    expect(mockProduct.name).toBe(newProduct?.name);
    expect(mockProduct.price).toBe(newProduct?.price);

    //Assert Inventory
    const id = newProduct?.id as unknown as string;

    const productInventory = await inventoryService.checkInventory(id);
    expect(productInventory.isAvailable).toBeTruthy();
    expect(productInventory.quantity).toBe(205);
    

  })
})