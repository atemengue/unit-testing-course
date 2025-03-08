import { afterEach, beforeEach, describe, vi } from 'vitest';
import { purchase } from '../../src/app/mocking/mocking';


describe("Puschare test suites", () => {
  
  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("should return success message if it business hours", () => {
    const date = new Date(2025, 8, 3, 10);
    vi.setSystemTime(date);

    const expectedMessage = purchase();
    expect(expectedMessage).toEqual({ message: 'Success'});
  });
  

  it("should return error message if it's not business hours", () => {
    const date = new Date(2025, 8, 3, 22);
    vi.setSystemTime(date);

    const expectedMessage = purchase();
    expect(expectedMessage).toEqual({ message: 'Error'});
  });
  
  
  
  

  
  afterEach(() =>{ 
    vi.useRealTimers();
  });



  
})