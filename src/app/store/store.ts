export enum ProductType {
  Book,
  Music,
  Movie
}

export class Customer {
  purchaseProduct(store: Store, product: ProductType, quantity: number): boolean {
    if (store.getInventory(product) < quantity) {
      return false;
    }
    store.addInventory(product, quantity);
    return true;
  }
}

export class Store {
  
  private items = new Map<ProductType, number>();

  addInventory(productType: ProductType, quantity: number) {
    if (this.items.has(productType)) {
      this.items.set(productType, (this.items.get(productType) || 0) + quantity);
    } else {
      this.items.set(productType, quantity);
    }
  }

  getInventory(productType: ProductType): number {
    return this.items.get(productType) || 0;
  }
}