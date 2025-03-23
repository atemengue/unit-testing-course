import { describe, expect, it, vi } from 'vitest';
import { Customer, ProductType, Store } from '../../src/app/store/store';

// vi.mock('../../src/app/store/store.ts', async () => {
//   // const original = await importOriginal<typeof import("../../src/app/store/store")>('../../src/app/store/store.ts');
//   const actual = await vi.importActual<typeof import('../../src/app/store/store')>('../../src/app/store/store.ts');

//   return {
//     default: {
//       ...actual,
//       Store: vi.fn(() => {
//         getInventory: vi.fn();
//         addInventory: vi.fn();
//       })
//   }
//   };
// });

const StoreMock = {
  addInventory: vi.fn(),
  getInventory: vi.fn(),
};


describe("Store class", () => {

  it("should add purchase product when enough stock", () => {

    // Arrange
    const customer = new Customer();
    
    StoreMock.getInventory.mockReturnValue(10);

    // Act
    const result = customer.purchaseProduct(StoreMock as any as Store, ProductType.Book, 5);

    // Assert
    expect(result).toBe(true);
    expect(StoreMock.addInventory).toHaveBeenCalledWith(ProductType.Book, 5);
    expect(StoreMock.getInventory).toHaveBeenCalledWith(ProductType.Book);
  })

})