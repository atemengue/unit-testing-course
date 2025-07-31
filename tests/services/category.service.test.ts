import { describe, expect, it, vi } from 'vitest';
import CategoryModel from '../../src/models/category';
import { listCategories } from '../../src/services/category.service';
import { ICategory } from '../../src/types';

vi.mock("../../src/models/category.ts", () => ({
  default: {
    find: vi.fn()
  }
}))

describe("Category Service", () => {

  describe("listeCategories tests suites", () => {
    it("doit me retourner une liste de categories de cafe", () => {
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

      // Assert
    });
  });


  describe("createCategories tests suites", () => {
    it.todo("doit creer une categorie de cafe")
  })

})