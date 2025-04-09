import { describe, expect, it, vi } from 'vitest';
import { getShippingQuote } from '../../src/app/libs/shipping';
import { getShippingInfo } from '../../src/app/mock/mocking';

vi.mock('../../src/app/libs/shipping');

describe("getShippingInfo", () => {

  it("should return shipping unavialable if quote is undefined", () => {

    // Arrange
    const destination = 'Yaounde'
    // mock the getShippingQuote function to return undefined
    vi.mocked(getShippingQuote).mockReturnValue(undefined);

    // Act
    const result = getShippingInfo(destination);

    // Assert
    expect(result).toMatch(/unavailable/i);
    expect(getShippingQuote).toHaveBeenCalledOnce()

  });
  it("shoutd return shipping cost with cost and estimatedDays", () => {

    const destination = "Douala";

    vi.mocked(getShippingQuote).mockReturnValue({
      cost: 10,
      estimatedDays: 5 
    });

    const result = getShippingInfo(destination);

    expect(result).toMatch(/5 Days/i);


  });

});