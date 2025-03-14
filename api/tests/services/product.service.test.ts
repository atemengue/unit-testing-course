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

  describe("CreateProduct",  async () => {
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
  
  })

})