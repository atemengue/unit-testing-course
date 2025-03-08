import { describe } from 'vitest';
import { calculateTotal } from '../../src/app/mocking/basket/basket';
import { BasketItem } from '../../src/app/mocking/basket/basketitem';
import { Event } from '../../src/app/mocking/events/event';

describe("Calculated Total", () => {

  it("Should return total 0 of if baskets if empty", () => {
    const basketItems: BasketItem[] = [];
    const total = calculateTotal(basketItems);
    expect(total).toBe(0)
  });

  it("should return total if baskets is not empty", () => {
  const events = [
      new Event(1, "A Night At The Proms", 2500.00, 2500, 2500),
      new Event(2, "Taylor Swift", 50.00, 5500, 2500),
      new Event(3, "Rage Against The Machine", 35.00, 2500, 2500),
  ];
    const items = [
    new BasketItem(events[0], 1),
    new BasketItem(events[1], 4),
    new BasketItem(events[2], 2),
  ];

  const total = calculateTotal(items);
  expect(total).toBeCloseTo(2770.00, 2);

  });

  it("Should calculates total basket price with discount",() => {

    const events = [
      new Event(1, "A Night At The Proms", 2500.00, 2500, 2500),
      new Event(2, "Taylor Swift", 50.00, 5500, 2500),
      new Event(3, "Rage Against The Machine", 35.00, 2500, 2500),
  ];
    const items = [
    new BasketItem(events[0], 1),
    new BasketItem(events[1], 4),
    new BasketItem(events[2], 2),
  ];

  const total = calculateTotal(items,800);
  expect(total).toBeCloseTo(1970.00, 2);
  })

})