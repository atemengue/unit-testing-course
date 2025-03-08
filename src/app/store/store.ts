export enum Product {
    Shampoo,
    Book
}

export class Store {
    private readonly inventory: Map<Product, number> = new Map<Product, number>();

    public hasEnoughInventory(product: Product, quantity: number): boolean {
        return this.getInventory(product) >= quantity;
    }

    public removeInventory(product: Product, quantity: number): void {
        if (!this.hasEnoughInventory(product, quantity)) {
            throw new Error("Not enough inventory");
        }

        const currentQuantity = this.inventory.get(product) || 0;
        this.inventory.set(product, currentQuantity - quantity);
    }

    public addInventory(product: Product, quantity: number): void {
        const currentQuantity = this.inventory.get(product) || 0;
        this.inventory.set(product, currentQuantity + quantity);
    }

    public getInventory(product: Product): number {
        return this.inventory.get(product) || 0;
    }
}

export class Customer {
    public purchase(store: Store, product: Product, quantity: number): boolean {
        if (!store.hasEnoughInventory(product, quantity)) {
            return false;
        }

        store.removeInventory(product, quantity);
        return true;
    }
}