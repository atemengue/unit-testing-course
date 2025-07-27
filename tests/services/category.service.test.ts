import { describe, expect, it, vi } from 'vitest';
import Category from '../../src/models/category';
import categoryService from '../../src/services/category.service';
import { ICategory } from '../../src/types';

vi.mock("../../src/models/category.ts", () => ({
  default: {
    find: vi.fn(),
    create: vi.fn()
  }
}));


describe("Category Services", () => {

  describe("listCategories tests suites", () => {

    it("should return list of all categories", async () => {

      // Arrange 
      const expectedCategories : ICategory[] = [
        {name: 'Expresso', description: 'simple description', imageUrl: 'expresso.jpg'}
      ]   // spy creation
      vi.spyOn(Category, 'find').mockReturnValue({
        exec: vi.fn().mockResolvedValue(expectedCategories)
      } as any)

            // Act
      const categories = await categoryService.listCategories();
    
      // Assert
      expect(Category.find).toHaveBeenCalled();
      expect(categories).toEqual(expectedCategories);

      // Assert
      expect(Category.find).toHaveBeenCalled();
      expect(categories).toEqual(expectedCategories);
    })


  });


  describe("createCategory tests suites", () => {
    it("should create a category", async () => {

            // Arrange
      const newCategory: ICategory = { name: 'Category 3', description: "", imageUrl: "" };

      vi.spyOn(Category, 'create').mockImplementation((newCategory) => Promise.resolve(newCategory) as any)

      // Act
      const result = await categoryService.createCategory(newCategory);

      // Assert
      expect(Category.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(newCategory);
      expect(Category.create).toHaveBeenCalledWith(newCategory);
    })
  });

});