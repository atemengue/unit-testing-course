import { create } from 'domain';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Inventory from '../../src/models/inventory';
import { InventoryService } from '../../src/services/inventory.service';

vi.mock("../../src/models/inventory.ts", () => {
  return {
    default: {
      findOne: vi.fn(),
      create: vi.fn(),
      findOneAndUpdate: vi.fn()
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

  describe("CreateInventory", () => {

    it("should create inventory and return isCreated true", async () => {
      // Arrange
      const inventory = {
        productId: "1",
        quantity: 10
      } as any

      (Inventory.create as any).mockResolvedValue(inventory);
      // Act
      const result = await sut.createInventory(inventory);
      // Assert
      expect(result).toEqual({ isCreated: true, message: "inventory created" });
    });

    it("should return isCreated false with error message", async () => {
      // Arrange
      const inventory = {
        productId: "1",
        quantity: 10
      } as any

      (Inventory.create as any).mockResolvedValue(null);
      // Act
      const result = await sut.createInventory(inventory);
      // Assert
      expect(result).toEqual({ isCreated: false, message: "error" });
    });
  });

  describe("UpdateInventory", () => {
    
    it("should update inventory and return isUpdated true", async () => {
      // Arrange
      const id = "1";
      const quantity = 5;
      const filter = { productId: id };

      (Inventory.findOneAndUpdate as any).mockResolvedValue({});

      // Act
      const result = await sut.updateInventory(id, quantity);

      // Assert
      expect(Inventory.findOneAndUpdate).toHaveBeenCalledWith(
        filter, { $inc: { quantity: -quantity }}, { new: true }
      );
      expect(result).toEqual({ message: "Inventory Updated!", isUpdated: true });
    });

    it("should throw error if update fails", async () => {
      // Arrange
      const id = "1";
      const quantity = 5;
      (Inventory.findOneAndUpdate as any).mockRejectedValue("reject promise");

      // Act & Assert
      await expect(sut.updateInventory(id, quantity)).rejects.toThrow(/reject/i);
    });


  })
})