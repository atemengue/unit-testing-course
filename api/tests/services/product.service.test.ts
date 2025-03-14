import { Types } from 'mongoose';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Product from '../../src/models/product';
import ProductService from '../../src/services/product.service';
import { IProduct } from '../../src/types';

vi.mock("../../src/models/product.ts", () => ({
  default: {
    find: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
  }}));





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
      const result = await sut.createProduct();
      
      // Assert
      expect(result).toEqual(newProduct);
      expect(Product.create).toHaveBeenCalledTimes(1);
      expect(Product.create).toHaveBeenCalledWith(newProduct);
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('stock');
      expect(result).toHaveProperty('price');


      
    })

  });


  describe("GetById", () => {

  })

})