interface IEmailGateway {
  sendReceipt(email: string, productName: string, quantity: number): void;
}

class EmailGateway implements IEmailGateway {
  sendReceipt(email: string, productName: string, quantity: number): void {
      // Implementation for sending receipt
  }
}

class Product {
  id: number;
  name: string;
  static Shampoo: Product;
}

class Customer {
  email: string;

  purchase(store: IStore, product: Product, quantity: number): boolean {
      if (!store.hasEnoughInventory(product, quantity)) {
          return false;
      }

      store.removeInventory(product, quantity);
      return true;
  }
}

interface IStore {
  hasEnoughInventory(product: Product, quantity: number): boolean;
  removeInventory(product: Product, quantity: number): void;
  addInventory(product: Product, quantity: number): void;
  getInventory(product: Product): number;
}

class Store implements IStore {
  private inventory: Map<Product, number> = new Map<Product, number>();
  id: number;

  hasEnoughInventory(product: Product, quantity: number): boolean {
      return this.getInventory(product) >= quantity;
  }

  removeInventory(product: Product, quantity: number): void {
      if (!this.hasEnoughInventory(product, quantity)) {
          throw new Error("Not enough inventory");
      }

      const currentQuantity = this.inventory.get(product) || 0;
      this.inventory.set(product, currentQuantity - quantity);
  }

  addInventory(product: Product, quantity: number): void {
      const currentQuantity = this.inventory.get(product) || 0;
      this.inventory.set(product, currentQuantity + quantity);
  }

  getInventory(product: Product): number {
      return this.inventory.get(product) || 0;
  }
}

class ProductRepository {
  getById(productId: number): Product {
      return new Product();
  }
}

class CustomerRepository {
  getById(customerId: number): Customer {
      return new Customer();
  }
}

class CustomerController {
  private customerRepository: CustomerRepository;
  private productRepository: ProductRepository;
  private mainStore: Store;
  private emailGateway: IEmailGateway;

  constructor(emailGateway: IEmailGateway) {
      this.emailGateway = emailGateway;
      this.customerRepository = new CustomerRepository();
      this.productRepository = new ProductRepository();
      this.mainStore = new Store();
  }

  purchase(customerId: number, productId: number, quantity: number): boolean {
      const customer = this.customerRepository.getById(customerId);
      const product = this.productRepository.getById(productId);

      const isSuccess = customer.purchase(this.mainStore, product, quantity);

      if (isSuccess) {
          this.emailGateway.sendReceipt(customer.email, product.name, quantity);
      }

      return isSuccess;
  }
}