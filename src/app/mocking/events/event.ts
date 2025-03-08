export class Event {
  
  id: number;
  name: string;
  ticketPrice: number;
  totalTickets: number;
  ticketsRemaining: number;
  date?: Date

  constructor(id: number, name: string, ticketPrice: number, totalTickets: number, ticketsRemaining: number, date?: Date){
    this.id = id;
    this.name = name;
    this.ticketPrice = ticketPrice;
    this.totalTickets = totalTickets;
    this.ticketsRemaining = ticketsRemaining;
    this.date = date
  }

  isSoldOut(event: Event): boolean {
    return event.ticketsRemaining === 0
  }
}