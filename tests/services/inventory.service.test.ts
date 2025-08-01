import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Inventory from '../../src/models/inventory';
import { CheckInterface, InventoryService } from '../../src/services/inventory.service';


vi.mock("../../src/models/inventory.ts", () => {
  return {
    default: {
      findOne: vi.fn()
    }
  }
} )


describe("Inventory Service", () => {

  let sut: InventoryService;
  beforeEach(() => {
    sut  = new InventoryService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  })

  describe("checkInventory Tests Suites", () => {

    it("doit me retourner un objet avec isAvailable = false et message =`product Not Found`", async () => {

      // Arrange
      const id  = "1";
      const expected = {
        message: 'Product Not Found',
        isAvailable:  false
      };

      // Mock
      (Inventory.findOne as any).mockResolvedValue(null)

      // Act
      const actual =  await sut.checkInventory(id);

      // Assert
      expect(Inventory.findOne).toHaveBeenCalledWith({"productId": id });
      expect(Inventory.findOne).toHaveBeenCalledTimes(1);
      expect(actual).toEqual(expected);
      expect(actual.message).toMatch(/Not Found/i);
      expect(actual.isAvailable).toBeFalsy();

    });
    it("doit me retourner un objet avec quantite et isAvailable = true", async () => {
      // Arrange 
      const id = "1";
      const expected = {
          isAvailable: true,
          quantity:  10
        };
      // Mock FindOne
      (Inventory.findOne as any).mockResolvedValue(expected);

      // Act
      const actual = await sut.checkInventory(id);

      // Assert
      expect(Inventory.findOne).toHaveBeenCalledWith({"productId": id });
      expect(Inventory.findOne).toHaveBeenCalledTimes(1);
      expect(actual).toEqual(expected);
      expect(actual.quantity).toBe(10);
      expect(actual.isAvailable).toBeTruthy();


    })
    it("doit me retourner un message d'erreur", async () => {

      // Arrange
      const id = "1";
      (Inventory.findOne as any).mockRejectedValue("reject Promise");
      // 
      await expect(sut.checkInventory(id)).rejects.toThrow(/reject/i)

    });

  })

})