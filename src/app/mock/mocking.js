import { getShippingQuote } from '../libs/shipping';

export function getShippingInfo(destination){
  const quote = getShippingQuote(destination);
  if (!quote) return 'Shipping unavailable';
  return `Shipping Cost: $${quote.cost}, Delivery Time: ${quote.estimatedDays} Days`; 
}