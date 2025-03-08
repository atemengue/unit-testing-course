import { Event } from '../events/event';

export class BasketItem {

  event: Event;
  ticketCount: number;

  constructor(event: Event, ticketCount: number) {
    this.event = event;
    this.ticketCount = ticketCount;
  }

  getPrice(): number {
    return this.event.ticketPrice * this.ticketCount;
  }
}