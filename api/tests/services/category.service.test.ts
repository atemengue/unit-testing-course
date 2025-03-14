import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Category from '../../src/models/category';
import categoryService from '../../src/services/category.service';
import { ICategory } from '../../src/types';

vi.mock("../../src/models/category.ts", () => ({
  default: {
    find: vi.fn(),
    create: vi.fn()
  }
}));

afterEach(() => {
  vi.resetAllMocks();
})

describe("Category Services", () =>{
  describe("LisCategories", () => {

    it("should return all categories", async () => {

      //Arrange
      const mockCategories : ICategory[] = [
        { name: 'Expresso', description: 'strong coffee', imageUrl: 'expresso.jpg'}
      ];

      // spy creation
      vi.spyOn(Category, 'find').mockReturnValue({
        exec: vi.fn().mockResolvedValue(mockCategories)
      } as any)

      // Act
      const categories = await categoryService.listCategories();
    
      // Assert
      expect(Category.find).toHaveBeenCalled();
      expect(categories).toEqual(mockCategories);

    });
    it("should create category", async () => {
      
      // Arrange
      const newCategory: ICategory = { name: 'Category 3', description: "", imageUrl: "" };

      vi.spyOn(Category, 'create').mockImplementation((newCategory) => Promise.resolve(newCategory) as any)

      // Act
      const result = await categoryService.createCategory(newCategory);

      // Assert
      expect(Category.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(newCategory);
      expect(Category.create).toHaveBeenCalledWith(newCategory);

    });

  })
})

// describe("Category Services", () => {

//   describe("ListCategories", () => {

//     it("Should return all categories", async () => {

//       const mockCategories: ICategory[] = [
//         { name: 'Category 1', description: "", imageUrl: "" },
//         { name: 'Category 2', description: "", imageUrl: "" }
//       ];

//       (Category.find as any).mockReturnValue({
//         exec: vi.fn().mockResolvedValue(mockCategories)
//       });
    
//       // Act
//         const result = await categoryService.listCategories();
      
//         // Assert

//         expect(Category.find).toHaveBeenCalledTimes(1);
//         expect(result).toEqual(mockCategories);
//         expect(result).toHaveLength(2);
//     })

//   });


//   describe("createCategory", async () => {

//     it("should create category", async () => {
//       // Arrange
//       const newCategory: ICategory = { name: 'Category 3', description: "", imageUrl: "" };
      
//       (Category.create as any).mockResolvedValue(newCategory);
      
//       // Act
//       const result = await categoryService.createCategory(newCategory);
      
//       // Assert
//       expect(Category.create).toHaveBeenCalledTimes(1);
//       expect(result).toEqual(newCategory);
//       expect(Category.create).toHaveBeenCalledWith(newCategory);
//     })
//   })
// })


