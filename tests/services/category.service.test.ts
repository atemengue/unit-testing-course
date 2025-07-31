import { beforeAll, describe, expect, it, vi } from 'vitest';
import CategoryModel from '../../src/models/category';
import { createCategory, listCategories } from '../../src/services/category.service';
import { ICategory } from '../../src/types';

vi.mock("../../src/models/category.ts", () => ({
  default: {
    find: vi.fn(),
    create: vi.fn(),
  }
}))

describe("Category Service", () => {

  describe("listCategories tests suites", () => {
    
    beforeAll(() => {
      vi.resetAllMocks();
    });


    it("doit me retourner une liste de categories de cafe", async () => {
      // Arrange
      const categories: ICategory[]  = [{
        name: "Arabica",
        description: "goût doux, faible en caféine, souvent fruité ou floral",
        imageUrl: "http://url.com"
      }];

      // creation de spy de find
      vi.spyOn(CategoryModel, 'find').mockReturnValue({
        exec: vi.fn().mockResolvedValue(categories)
      } as any)

      // Act
      const actual = await listCategories();

      // Assert
      expect(CategoryModel.find).toHaveBeenCalled();
      expect(actual).toEqual(categories);
      expect(CategoryModel.find).toHaveBeenCalledOnce();


    });
  });


  describe("createCategory tests suites", () => {
    beforeAll(() => {
      vi.resetAllMocks();
    });
    it("doit creer une categorie de cafe", async () => {

      // Arrange
      let newCategory: ICategory =  {
        name: 'Robusta',
        description: 'Plus amer, plus corsé, plus de caféine, souvent utilisé dans l’espresso',
        imageUrl: 'http://url.com'
      };

      vi.spyOn(CategoryModel, 'create').mockImplementation((category) => Promise.resolve(category) as any);

      // Act

      const result = await createCategory(newCategory);

      // Assert
      expect(CategoryModel.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(newCategory);
      expect(CategoryModel.create).toHaveBeenCalledWith(newCategory);


    })
  })

})