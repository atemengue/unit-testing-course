import { describe, expect, it } from 'vitest';
import { Customer, ProductType, Store } from '../../src/app/store/store';

describe("Store class", () => { 

  it("should add inventory", () => {
    // Arrange
    const store: Store = new Store();
    store.addInventory(ProductType.Book, 10);
    var customer: Customer = new Customer();
    
    // Act
    const result = customer.purchaseProduct(store, ProductType.Book, 5);
    
    // Assert
    expect(result).toBe(true);
    expect(store.getInventory(ProductType.Book)).toBe(15);
    
  });

  it("should not add inventory if not enough stock", () => {
    // Arrange
    const store: Store = new Store();
    store.addInventory(ProductType.Book, 10);
    var customer: Customer = new Customer();
    
    // Act
    const result = customer.purchaseProduct(store, ProductType.Book, 15);
    
    // Assert
    expect(result).toBe(false);
    expect(store.getInventory(ProductType.Book)).toBe(10);
  })

 })