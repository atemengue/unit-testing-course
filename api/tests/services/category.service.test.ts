import { describe, expect, it, vi } from 'vitest';
import Category from '../../src/models/category';
import categoryService from '../../src/services/category.service';
import { ICategory } from '../../src/types';

vi.mock("../../src/models/category.ts");

describe("Category Services", () => {

  describe("ListCategories", () => {

    it("Should return all categories", async () => {

      const mockCategories: ICategory[] = [
        { name: 'Category 1', description: "", imageUrl: "" },
        { name: 'Category 2', description: "", imageUrl: "" }
      ];

      (Category.find as any).mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockCategories)
      });
    
      // Act
        const result = await categoryService.listCategories();
      
        // Assert

        expect(Category.find).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockCategories);
        expect(result).toHaveLength(2);
    })

  });


  describe("createCategory", async () => {

    it("should create category", async () => {
      // Arrange
      const newCategory: ICategory = { name: 'Category 3', description: "", imageUrl: "" };
      
      (Category.create as any).mockResolvedValue(newCategory);
      
      // Act
      const result = await categoryService.createCategory(newCategory);
      
      // Assert
      expect(Category.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(newCategory);
      expect(Category.create).toHaveBeenCalledWith(newCategory);
    })
  })
})




//vi.mock('../../src/models/category');

// describe('Category Service', () => {
//   describe('listCategories', () => {
//     it('should return a list of categories', async () => {
//       const mockCategories: ICategory[] = [
//         { name: 'Category 1',description: "", imageUrl: "" },
//         { name: 'Category 2', description: "", imageUrl: "" }
//       ];

//       (Category.find as vi.Mock).mockResolvedValue(mockCategories);

//       const categories = await categoryService.listCategories();

//       expect(categories).toEqual(mockCategories);
//       expect(Category.find).toHaveBeenCalledTimes(1);
//     });
//   });

//   describe('createCategory', () => {
//     it('should create a new category', async () => {
//       const newCategory: ICategory = { id: '3', name: 'Category 3' };
//       (Category.create as vi.Mock).mockResolvedValue(newCategory);

//       const createdCategory = await categoryService.createCategory(newCategory);

//       expect(createdCategory).toEqual(newCategory);
//       expect(Category.create).toHaveBeenCalledWith(newCategory);
//       expect(Category.create).toHaveBeenCalledTimes(1);
//     });
//   });
// });