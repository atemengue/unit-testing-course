import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Inventory from '../../src/models/inventory';
import InventoryService from '../../src/services/inventory.service';

vi.mock("../../src/models/inventory.ts", () => {
  return {
    default: {
      findOne: vi.fn()
    }
  }
})
describe("Inventory Service", () => {
  let sut : InventoryService;

  beforeEach(() =>{
    sut = new InventoryService();
  });

  afterEach(() => {
    vi.clearAllMocks();
  })

  describe("CheckInventory", () => {
    it("should return inventory of product is avaliable", async () => {
      // Arrange
      const id = "1";
      const inventory = {
        isAvailable: true,
        quantity: 10
      };

      // Mock
      (Inventory.findOne as any).mockResolvedValueOnce(inventory);
      // Act
      const result = await sut.checkInventory(id);
      // Assert
      expect(result).toEqual(inventory);
      expect(result?.isAvailable).toBeTruthy();
      expect(result).toHaveProperty("quantity");
      expect(result?.quantity).toBe(10);

    });
    it("shoudl object object with message product not found", async () => {
      // Arrange
      const id = "2";

      const inventory = {
        isAvailable: false,
        message: "Product Not Found"
      };

    (Inventory.findOne as any).mockResolvedValue(null);
      // Assert
      const actual = await sut.checkInventory(id);

      // Act
      expect(Inventory.findOne).toHaveBeenCalledWith({ "productId": id});
      expect(Inventory.findOne).toHaveBeenCalledTimes(1);
      expect(actual).toEqual(inventory);
      expect(actual?.message).toBe("Product Not Found");
      expect(actual?.isAvailable).toBeFalsy();

    });
    it("should return message with error", async () => {
      // Arrange
      const id = "1";
      (Inventory.findOne as any).mockRejectedValue("reject promise");
      // Act
      await expect(sut.checkInventory(id)).rejects.toThrow(/reject/i);
    });

  });
})