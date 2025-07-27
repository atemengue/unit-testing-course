import { Types } from 'mongoose';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

  vi.mock("../../src/models/product.ts", () => {
  return {
    default: {
      find: vi.fn(),
      create: vi.fn(),
      findById: vi.fn(),
      findByIdAndUpdate: vi.fn(),
      findByIdAndDelete: vi.fn()
    }
  }});

import Product from '../../src/models/product';
import ProductService from '../../src/services/product.service';
import { IProduct } from '../../src/types';


describe("Product Service Class", () => {

  let sut: ProductService ;

  beforeEach(() => {
    sut = new ProductService();
  })

  afterEach(() => {
    vi.resetAllMocks();
  })

  describe("CreateProduct", () => {
    it("Should create new Product", async () => {
      const newProduct : IProduct = {
        id: new Types.ObjectId(),
        name: "Expresso Double",
        description: "description",
        imageUrl: "url-image",
        stock: 10,
        price: 200,
        categoryId: new Types.ObjectId()
      }
      // Spy create
      vi.spyOn(Product, 'create').mockImplementation((newProduct) => Promise.resolve(newProduct) as any);
      // Act
      const result = await sut.createProduct(newProduct);
      // Assert
      expect(result).toEqual(newProduct);
      expect(Product.create).toHaveBeenCalledTimes(1);
      expect(Product.create).toHaveBeenCalledWith(newProduct);
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('stock');
      expect(result).toHaveProperty('price');
    })
  });


  describe("Lists", () => {
    it("should return a list of Product",  async () => {
      // Arrange
      const MockProducts = [
        {
          id: new Types.ObjectId(),
          name: "Latte",
          description: "description",
          imageUrl: "url-image",
          stock: 15,
          price: 150,
          categoryId: new Types.ObjectId()
        },
        {
          id: new Types.ObjectId(),
          name: "Cappuccino",
          description: "description",
          imageUrl: "url-image",
          stock: 20,
          price: 180,
          categoryId: new Types.ObjectId()
        }
      ];

      (Product.find as any).mockReturnValue(({
        exec: vi.fn().mockResolvedValue(MockProducts)
      }));

      // Act
      const result = await sut.lists();
      //Assert
      
      expect(Product.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(MockProducts);
      expect(result).toHaveLength(2);
    })
  
  });

  describe("GetById", () => {
    it("should return a product", async () => {
      // Arrange
      const id = "67d3e8c4e2bd8833f0a1b609";

      const mockProduct =  {
        id: "67d3e8c4e2bd8833f0a1b609",
        name: "prodcut01",
        description: "product description",
        price: 100,
        stock: 50,
        categoryId: "67d1820b3be3c2c03e1c626b"
      };

      // Mock GetById
      (Product.findById as any ).mockResolvedValueOnce(mockProduct);

      // Act
      const actual = await sut.getById(id);
      
      // Assert
      expect(actual).toEqual(mockProduct);
      expect(Product.findById).toHaveBeenCalledWith(id);
      expect(Product.findById).toHaveBeenCalledTimes(1)
    });


    it("should return null if product is not found", async () => {
      // Arrange
      const id = "67d3e8c4e2bd8833f0a1b609";
  
      // Mock GetById
      (Product.findById as any).mockResolvedValueOnce(null);
  
      // Act
      const actual = await sut.getById(id);
  
      // Assert
      expect(actual).toBeNull();
      expect(Product.findById).toHaveBeenCalledWith(id);
      expect(Product.findById).toHaveBeenCalledTimes(1);
    });

    it("should handle null or undefined id", async () => {
      // Arrange
      const id = null as unknown as string;
  
      // Mock GetById
      (Product.findById as any).mockResolvedValueOnce(null);
  
      // Act
      const actual = await sut.getById(id);
  
      // Assert
      expect(actual).toBeNull();
      expect(Product.findById).toHaveBeenCalledWith(id);
      expect(Product.findById).toHaveBeenCalledTimes(1);
    });
  
  });

  describe('updateProduct', () => {
    it('should update a product and return the updated product', async () => {
      // Arrange
      const id = '67d3e8c4e2bd8833f0a1b609';
      // use stubMock.
      const updateDataStub = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 200,
        stock: 100,
      };
      const updatedProduct = {
        id,
        ...updateDataStub,
      };

      // Mock findByIdAndUpdate
      (Product.findByIdAndUpdate as any).mockResolvedValueOnce(updatedProduct);

      // Act
      const result = await sut.updateProduct(id, updateDataStub as any);

      // Assert
      expect(result).toEqual(updatedProduct);
      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(id, updateDataStub, { new: true });
      expect(Product.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });

    it('should return null if the product is not found', async () => {
      // Arrange
      const id = 'nonexistent-id';

      const stubDataUpdate: IProduct = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 200,
        stock: 100,
      } as any;

      // Mock findByIdAndUpdate to return null
      (Product.findByIdAndUpdate as any).mockResolvedValueOnce(null);

      // Act
      const result = await sut.updateProduct(id, stubDataUpdate);

      // Assert
      expect(result).toBeNull();
      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(id, stubDataUpdate, { new: true });
      expect(Product.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product and return null', async () => {
      // Arrange
      const id = '67d3e8c4e2bd8833f0a1b609';
      const deletedProduct = {
        id,
        name: 'Deleted Product',
        description: 'Deleted Description',
        price: 100,
        stock: 50,
        categoryId: '67d1820b3be3c2c03e1c626b',
      };

      // Mock findByIdAndDelete
      (Product.findByIdAndDelete as any).mockResolvedValueOnce(deletedProduct);

      // Act
      const result = await sut.deleteProduct(id);

      // Assert
      expect(result).toEqual(deletedProduct);
      expect(Product.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(Product.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });

    it('should return null if the product is not found', async () => {
      // Arrange
      const id = 'nonexistent-id';

      // Mock findByIdAndDelete to return null
      (Product.findByIdAndDelete as any).mockResolvedValueOnce(null);

      // Act
      const result = await sut.deleteProduct(id);

      // Assert
      expect(result).toBeNull();
      expect(Product.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(Product.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  })
})