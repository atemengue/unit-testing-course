import { Request, Response } from 'express';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import ProductController from '../../src/controllers/product.controller';
import InventoryService from '../../src/services/inventory.service';
import ProductService from '../../src/services/product.service';

describe("Product Controller", () => {

  let sut: ProductController;

  const producServiceMock = {
    createProduct: vi.fn(),
    getById: vi.fn(),
    lists: vi.fn(),
    updateProduct: vi.fn(),
    deletProduct: vi.fn()
  }

  const inventoryServiceMock = {
  checkInventory: vi.fn(),
  createInventory: vi.fn(),
  updateInventory: vi.fn()
}

  beforeEach(() => {
    sut = new ProductController(
      producServiceMock as any as ProductService,
      inventoryServiceMock as any as InventoryService
    );

  })

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Create", () => {

    it("Should create product", async () => {
      // Arrange
      const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 100,
        stock: 1,
        description: 'This is a test product',
        categoryId: "67d1820b3be3c2c03e1c626b"
      };

      const mockInventory = { productId: mockProduct.id, quantity: mockProduct.stock };

      // Mock Request and Response
      const req = {
        body: mockProduct
      } as Request

      const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn(),
      } as unknown as Response

      // Mock service Method
      producServiceMock.createProduct.mockResolvedValue(mockProduct)
      inventoryServiceMock.createInventory.mockResolvedValue(mockInventory);

      // Act
      await sut.create(req, res)

      //Assert
      expect(producServiceMock.createProduct).toHaveBeenCalledWith(mockProduct);
      expect(inventoryServiceMock.createInventory).toHaveBeenCalledWith(mockInventory);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(mockProduct);
    });

    it('should return status 500 if an error occurs during product creation', async () => {
      // Arrange
      const productData = {
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        stock: 10,
        categoryId: '67d1820b3be3c2c03e1c626b',
      };
      const error = new Error('Database error');
  
      // Mock Request and Response
      const req = {
        body: productData,
      } as Request;
  
      const res = {
        status: vi.fn().mockReturnThis(), // Mock status to return `this` for chaining
        send: vi.fn(), // Mock send
      } as unknown as Response;
  
      // Mock service methods to throw an error
      producServiceMock.createProduct.mockRejectedValue(error);
  
      // Act
      await sut.create(req, res);
  
      // Assert
      // Check that res.status was called with 500
      expect(res.status).toHaveBeenCalledWith(500);
  
      // Check that res.send was called with the error
      expect(res.send).toHaveBeenCalledWith(error);
    });

    it('should return status 500 if an error occurs during inventory creation', async () => {
      // Arrange
      const productData = {
        id: 1,
        name: 'Product 1',
        description: 'Description 1',
        price: 100,
        stock: 10,
        categoryId: '67d1820b3be3c2c03e1c626b',
      };

      const error = new Error('Inventory creation failed');  
      // Mock Request and Response
      const req = {
        body: productData,
      } as Request;
  
      const res = {
        status: vi.fn().mockReturnThis(), // Mock status to return `this` for chaining
        send: vi.fn(), // Mock send
      } as unknown as Response;
  
      // Mock service methods
      producServiceMock.createProduct.mockResolvedValue(productData);
      inventoryServiceMock.createInventory.mockRejectedValue(error);
  
      // Act
      await sut.create(req, res);
  
      // Assert
      // Check that res.status was called with 500
      expect(res.status).toHaveBeenCalledWith(500);
  
      // Check that res.send was called with the error
      expect(res.send).toHaveBeenCalledWith(error);
    });
  });


  describe("GetById", () => {

      const id = 1;
       const req = {
        params: { id }
      }  as unknown as Request

      const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
      } as unknown as Response
      
      const mockProduct = {
        id: '1',
        name: 'Test Product',
        price: 100,
        stock: 1,
        description: 'This is a test product',
        categoryId: "67d1820b3be3c2c03e1c626b"
      };


    it("Should get product by id", async () => {
      // Arrange
      const id = 1;

      producServiceMock.getById.mockResolvedValue(mockProduct);
      // Act
      await sut.getById(req, res);
      // Assert
      expect(producServiceMock.getById).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockProduct);
    });

    it("Should send not content if produit not exist", async () => {

      // Arrange
      const id = 1;
      producServiceMock.getById.mockResolvedValue(null);

      // Act
      await sut.getById(req, res);
      expect(producServiceMock.getById).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledWith(null);
    });

    it("Sshould return status 500 if an error occurs during get product", async () => {

      // Arrange
      const id = 1;
      const error = new Error('Get Product failed');  

      producServiceMock.getById.mockRejectedValue(error);

      // Act
      await sut.getById(req, res);

      expect(producServiceMock.getById).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(error);
    });

  })

})