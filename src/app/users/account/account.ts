import { InvalidUsernameError } from '../../error-handling/exceptions';
import { createUserId, User, userExists } from './../users';
import { getPurchaseHistory } from './purchaseHistory/PurchaseHistory';

export class Purchase {
  eventName: string;
  tickets: number;
  cost: number;

  constructor(eventName: string, tickets: number, cost: number) {
      this.eventName = eventName;
      this.tickets = tickets;
      this.cost = cost;
  }
}

export async function isValidUserName(userName: string): Promise<boolean> {
  // Placeholder for request checking if username is valid
  if (!userName || !userName.includes('@')) {
      return false;
  }
  else{
      return true;
  }
}

export async function createAccount(username: string): Promise<{data: {userId: number, username: string}} | string> {
  if (!await isValidUserName(username)) {
      throw new InvalidUsernameError("Please enter a valid username");
  }
  const userExists: boolean = await userExists(username);
  return new Promise((resolve, reject) => {
      if (!userExists) {
          resolve({data: {
              "userId": createUserId(),
              "username": username,
          }});
      } else {
          reject("User already exists");
      }
     
  })
}

export function getPastPurchases(userId: string) {
  const purchases = getPurchaseHistory(userId);
      if (purchases.readyState === 4) {
          return purchases.response.events;
      }
      else {
          throw Error("Failed to get purchase history");
      }
}
