import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Inventory from '../../../src/models/inventory';
import { CheckInterface, InventoryService } from '../../../src/services/inventory.service';
import { IInventory } from '../../../src/types';


vi.mock("../../../src/models/inventory.ts", () => {
  return {
    default: {
      findOne: vi.fn(),
      create: vi.fn(),
      findOneAndUpdate: vi.fn()
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
      await expect(sut.checkInventory(id)).rejects.toThrow(/reject/i)

    });

  });

  describe("createInventory Tests Suites", () => {

    it("doit retourner un objet avec isCreated = true et un message = inventory created", async () => {
      const inventory : IInventory = {
        productId: "1",
        quantity: 10
      } as any

      (Inventory.create as any).mockResolvedValue(inventory);

      const actual = await sut.createInventory(inventory);

      expect(actual).toEqual({ isCreated: true, message: 'inventory created'});

    });
    it("doit retourner un objet avec isCreated = false et un message d'erreur", async () => {

      const inventory : IInventory = {
        productId: "1",
        quantity: 10
      } as any

      (Inventory.create as any).mockResolvedValue(null);

      const actual = await sut.createInventory(inventory);

      expect(Inventory.create).toHaveBeenCalledWith(inventory);
      expect(Inventory.create).toHaveBeenCalledTimes(1);
      expect(actual.isCreated).toBeFalsy();
      expect(actual.message).toBe("error");
    });
  });

  describe("updateInventory Tests Suites", () => {

    it("doit me retourner un object avec message = Inventory Updated! et isUpdated = true", async () => {

      const id = "1"
      const quantity = 10
      const filter = { productId: id };
      

      (Inventory.findOneAndUpdate as any).mockResolvedValue({});

      const actual = await sut.updateInventory(id, quantity);

      expect(Inventory.findOneAndUpdate).toHaveBeenCalledWith(
        filter, { $inc: { quantity: -quantity }}, { new: true }
      );

      expect(actual).toEqual({
        message: "Inventory Updated!",
        isUpdated: true
      })


    });

    it("doit capturer l'erreur si la MAJ echoue", async () => {

      const id  = "1";
      const quantity = 5;

      (Inventory.findOneAndUpdate as any).mockRejectedValue("reject promise");
      
      // Act & Assert
      await expect(sut.updateInventory(id, quantity)).rejects.toThrow(/reject/i);

    })
  })

})