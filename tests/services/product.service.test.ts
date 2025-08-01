import { Types } from 'mongoose';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Product from '../../src/models/product';
import ProductService from '../../src/services/product.service';
import { IProduct } from '../../src/types';



vi.mock("../../src/models/product.ts", () => {
  return {
    default: {
      create: vi.fn()
    }
  }
})

describe("Product Service", () => {

  let sut: ProductService

  beforeEach(() => {
    sut = new ProductService;
  });

  afterEach(() => {
    vi.clearAllMocks;
  })


  describe("createProduct Tests Suites", () => {

    it("doit creer un produit", async () => {
      const newProduct : IProduct ={
        id: new Types.ObjectId(),
        name: "Expresse Double",
        description: "Simple Description",
        imageUrl: "url.image.com",
        stock: 10,
        price: 200,
        categoryId: new Types.ObjectId()
      };

      vi.spyOn(Product, 'create').mockImplementation((product) => Promise.resolve(newProduct) as  any);

      const actual = await sut.createProduct(newProduct);

      expect(actual).toEqual(newProduct);
      expect(Product.create).toHaveBeenCalledWith(newProduct);
      expect(Product.create).toHaveBeenCalledTimes(1);
      expect(actual).toHaveProperty('id');
      expect(actual).toHaveProperty('name');
      expect(actual).toHaveProperty('stock');
      expect(actual).toHaveProperty('stock');
      expect(actual).toHaveProperty('categoryId');
      expect(actual).toHaveProperty('description');


    })


  });

  describe("getById Tests Suites", () => {
    
  });

  describe("getByName Tests Suites", () => {
    
  });

  describe("lists Tests Suites", () => {
    
  });
  
  describe("updateProduct Tests Suites", () => {
    
  });

  describe("deleteProduct Tests Suites", () => {
    
  });

})