import { describe, expect, it } from 'vitest';
import { Customer, Product, Store } from '../../src/app/store/store';


describe("Suite tests Customer class", () => {

  // let store: Store; 
  // beforeAll(() => {
  //   store = new Store();
  //   store.addInventory(Product.Book, 10);
  // })

  it("Sould purchase product when enough inventory", () => {

    // Arrange
    const store = new Store();
    store.addInventory(Product.Book, 10);
    const SUT = new Customer();
    
    // Act
    const expected = SUT.purchase(store, Product.Book,5);

    //Assert
    expect(expected).toBe(true);
    expect(store.getInventory(Product.Book)).toBe(5);
    
  });

  it("Sould purchase fails product when not enough inventory", () => {

    // Arrange
    const store = new Store();
    store.addInventory(Product.Book, 10);
    const SUT = new Customer();
    
    // Act
    const expected = SUT.purchase(store, Product.Book,15);

    //Assert
    expect(expected).toBe(false);
    expect(store.getInventory(Product.Book)).toBe(10);
    
  });



})