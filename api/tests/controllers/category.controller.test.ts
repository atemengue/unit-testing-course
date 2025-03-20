import { Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import { createCategory, listCategories } from '../../src/controllers/category.controller';
import categoryService from '../../src/services/category.service';
import { ICategory } from './../../src/types/index';

vi.mock("../../src/services/category.service.ts", () => {
  return {
      default: {
        listCategories: vi.fn(),
        createCategory: vi.fn(),
      }
  }
});


describe("Category Controller", () => {

  describe("Create Category", () => {
    it("should create a category and return 201", async () => {
      // Test implementation
      const newCategory = { name: 'Fashion', description: '', imageUrl: '' };

      // Arrange
      const req = {
      body: newCategory
      } as Request;

      const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
      } as unknown as Response;

      // mock category service
      vi.mocked(categoryService.createCategory).mockResolvedValue(newCategory);

      // Act
      await createCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith(newCategory);
    });

    it("should return 500 error when creating a category fails", async () => {
      // Test implementation
      const newCategory = { name: 'Fashion', description: '', imageUrl: '' };

      // Arrange
      const req = {
      body: newCategory
      } as Request;

      const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
      } as unknown as Response;

      // mock category service
      vi.mocked(categoryService.createCategory).mockRejectedValue(new Error("Error"));

      // Act
      await createCategory(req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("Get All Categories", () => {
    it("should get all categories", async () => {
      // Test implementation

      const categories = [{
        name: 'Electronics', description: '', imageUrl: ''
      }, {
        name: 'Books', description: '', imageUrl: ''  
      }]
      
      // Arrange
      const _req = {
        body: {}
      } as Request;

      const res = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
      }as unknown as Response;

      // mock category service
      vi.mocked(categoryService.listCategories).mockResolvedValue(categories);
      // Act

      await listCategories(_req, res);

      // Assert
      expect(res.status).toHaveBeenCalledWith(200);


    });
  });

  it("should return 204 not found categories", async () => {
    // Test implementation
    const categories: ICategory[] = []
    
    // Arrange
    const _req = {
      body: {}
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    }as unknown as Response;

    // mock category service
    vi.mocked(categoryService.listCategories).mockResolvedValue(categories);
    // Act

    await listCategories(_req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(204);

  });

  it("should return 500 error all categories", async () => {
    // Test implementation
    const categories: ICategory[] = []
    
    // Arrange
    const _req = {
      body: {}
    } as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    }as unknown as Response;

    // mock category service
    vi.mocked(categoryService.listCategories).mockRejectedValue(new Error("Error"));
    // Act

    await listCategories(_req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

