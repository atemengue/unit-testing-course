import { Types } from 'mongoose';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Product from '../../../src/models/product';
import ProductService from '../../../src/services/product.service';
import { IProduct } from '../../../src/types';



vi.mock("../../../src/models/product.ts", () => {
  return {
    default: {
      create: vi.fn(),
      findById: vi.fn(),
      findOne: vi.fn(),
      find: vi.fn(),
      findByIdAndUpdate: vi.fn(),
      findByIdAndDelete: vi.fn(),

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

      vi.spyOn(Product, 'create').mockImplementation((product) => Promise.resolve(product) as  any);

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
    
    it("doit me retourner un produit", async () => {

      const id = "64c4b7c7d5e6f8b9a2d3e4f5";
      const product = {
        id: "64c4b7c7d5e6f8b9a2d3e4f5",
        name: "Cafe Mixte",
        description: "Mixte Noir et du chocolat",
        price: 1000,
        stock: 50,
        categoryId: "64c4b7c7d5e6f8b9a2d3e493"
      };

      (Product.findById as any).mockResolvedValueOnce(product);

      const actual = await sut.getById(id);

      expect(actual).toEqual(product);
      expect(Product.findById).toHaveBeenCalledTimes(1);
      expect(Product.findById).toHaveBeenCalledWith(id);

    })

  });

  describe("getByName Tests Suites", () => {

    it("doit retourner un produit par name", async () => {
      const name = "expresso double"
      const product = {
        id: "64c4b7c7d5e6f8b9a2d3e4f5",
        name: name,
        description: "Double Expresso sans sucre",
        price: 2000,
        stock: 5,
        categoryId: "64c4b7c7d5e6f8b9a2d3e493"
      };

      (Product.findOne as any).mockResolvedValueOnce(product);

      const actual = await sut.getByName(name);

      expect(actual).toEqual(product);
      expect(Product.findOne).toHaveBeenCalledTimes(1);
      expect(Product.findOne).toHaveBeenCalledWith({ name: name });
    });
  });

  describe("lists Tests Suites", () => {
    
  it("doit me retourner une liste de produit(cafe)", async () => {
    const listProducts = [
      {
        id: new Types.ObjectId(),
        name: "Cafe Mixte Noir",
        description: "Mixte Noir et du chocolat",
        price: 1000,
        stock: 5,
        categoryId: new Types.ObjectId()
      },
      {
        id: new Types.ObjectId(),
        name: "Cappuccino",
        description: "Cappuccino",
        price: 2000,
        stock: 8,
        categoryId: new Types.ObjectId()
      }
    ];

    (Product.find as any).mockReturnValue(({
      exec: vi.fn().mockResolvedValue(listProducts)
    }))

    const actual = await sut.lists();

    expect(Product.find).toHaveBeenCalledTimes(1);
    expect(actual).toEqual(listProducts);
    expect(actual.length).toBeGreaterThan(0);
  })


  });
  
  describe("updateProduct Tests Suites", () => {
    
    it('doit mettre a jour un produit et renvoyer le produit', async () => {
      // Arrange
      const id = '67d3e8c4e2bd8833f0a1b609';
      const updateData = {
        name: 'Updated Product',
        description: 'Updated Description',
        price: 200,
        stock: 100,
      };
      const updatedProduct = {
        id,
        ...updateData,
      };

      // Mock findByIdAndUpdate
      (Product.findByIdAndUpdate as any).mockResolvedValueOnce(updatedProduct);

      // Act
      const result = await sut.updateProduct(id, updateData as any);

      // Assert
      expect(result).toEqual(updatedProduct);
      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith(id, updateData, { new: true });
      expect(Product.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    });

  });

  describe("deleteProduct Tests Suites", () => {
    it('doit supprimer un produit', async () => {
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

  });

})