import { BasketItem } from './basketitem';


export function calculateTotal(basketItems: BasketItem[], discount?: number |null): number {
  let total = 0;
  if (basketItems.length) {
      if (basketItems.length === 1) {
          total = basketItems[0].getPrice();
      } else {
          total = 0;
          for (let item of basketItems) {
              total += item.getPrice();
          }
      }
  } else {
      total = 0;
  }

  if (discount) {
      return total - discount;
  }

  return total;
}