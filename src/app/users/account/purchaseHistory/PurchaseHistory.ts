import { Purchase } from "../account";

const BASE_URL = "https://example.com"; // Define your BASE_URL here

export function getPurchaseHistory(userId: string): Promise<XMLHttpRequest> {
  const url = new URL("/account/orders/history", BASE_URL);
  url.searchParams.append("userId", userId);

  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", url.toString());
    request.onload = () => {
      if (request.status >= 200 && request.status < 300) {
        resolve(request);
      } else {
        reject(new Error(`Request failed with status ${request.status}`));
      }
    };
    request.onerror = () => reject(new Error("Network error"));
    request.send();
  });
}

export function parsePurchaseResponse(purchaseData: any[]): Purchase[] {
  const purchases: Purchase[] = [];

  for (const purchase of purchaseData) {
    purchases.push(
      new Purchase(purchase.event, purchase.tickets, purchase.price)
    );
  }

  return purchases;
}