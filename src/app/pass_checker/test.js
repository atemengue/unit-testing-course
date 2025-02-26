export class OrderService {
  constructor(pricingService) {
    this.pricingService = pricingService;
  }

  calculateTotal(order) {
    let total = 0;
    for (const item of order.items) {
      const price = this.pricingService.getPrice(item.productId);
      total += price * item.quantity;
    }
    return total;
  }
}
