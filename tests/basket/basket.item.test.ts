import { describe, expect, it, vi } from 'vitest';
import { BasketItem } from '../../src/app/mocking/basket/basketitem';
import { Event } from '../../src/app/mocking/events/event';

// mocking Event 

vi.mock('../../src/app/mocking/events/event.ts');

describe("BasketItem suites tests", () => {

  // mocking Event 
  vi.mock('../../src/app/mocking/events/event.ts');

  describe("BasketItem suites tests", () => {

    it("Should return price of basket", () => {
      // Arrange
      const mockedEvent = {
        id: 1,
        name: 'The First Movie',
        ticketPrice: 2500,
        totalTickets: 10,
        ticketsRemaining: 250,
        isSoldOut: vi.fn().mockReturnValue(false)
      };
      vi.mocked(Event).mockImplementation(() => mockedEvent);
      const event = new Event(1, "The Movie Premiere", 2500, 10, 10);
      const basketItem = new BasketItem(event, 10);

      // Act
      const price = basketItem.getPrice();

      // Assert
      expect(price).toBe(25000);
    });

    it("Should return good price of basket", () => {
      
      const mockedEventClass = {
        id: 1,
        name: "Hello",
        ticketPrice: 2500,
        totalTickets: 20,
        ticketsRemaining: 250,
        isSoldOut: vi.fn().mockReturnValue(false)
      }

      vi.mocked(Event).mockImplementation(() => mockedEventClass);
      const event = new Event(1, "The Movie Premiere", 2500, 500, 10);
      const basketItem = new BasketItem(event, 50);
      console.log(basketItem.event);

      const price = basketItem.getPrice();
      expect(price).toBe(125000);
      

    })



    // it("Should return correct number of tickets", () => {
    //   // Arrange
    //   const mockedEvent = {
    //     id: 1,
    //     name: 'The First Movie',
    //     ticketPrice: 2500,
    //     totalTickets: 10,
    //     ticketsRemaining: 250,
    //     isSoldOut: vi.fn().mockReturnValue(false)
    //   };
    //   vi.mocked(Event).mockImplementation(() => mockedEvent);
    //   const event = new Event(1, "The Movie Premiere", 2500, 10, 10);
    //   const basketItem = new BasketItem(event, 5);

    //   // Act
    //   const tickets = basketItem.getTickets();

    //   // Assert
    //   expect(tickets).toBe(5);
    // });

    // it("Should return true if event is sold out", () => {
    //   // Arrange
    //   const mockedEvent = {
    //     id: 1,
    //     name: 'The First Movie',
    //     ticketPrice: 2500,
    //     totalTickets: 10,
    //     ticketsRemaining: 0,
    //     isSoldOut: vi.fn().mockReturnValue(true)
    //   };
    //   vi.mocked(Event).mockImplementation(() => mockedEvent);
    //   const event = new Event(1, "The Movie Premiere", 2500, 10, 0);
    //   const basketItem = new BasketItem(event, 5);

    //   // Act
    //   const soldOut = basketItem.isSoldOut();

    //   // Assert
    //   expect(soldOut).toBe(true);
    // });

  });
  

})