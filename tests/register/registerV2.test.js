import { describe, expect, it, vi } from 'vitest';
import { sendMail } from '../../src/app/libs/sendMail';
import { registerUser } from '../../src/app/register/registerV2';

// mock path
vi.mock('../../src/app/libs/sendMail.js');


describe("RegisterUser (mock Version)", () => {

  it("Should register a new user", () => {

    // Arrange
    const user = {
      name: "John Doe",
      email: "test@email.com"
    };

    // Mock the sendMail function
    const mockSendMail = vi.mocked(sendMail);

    // Act
    const result = registerUser(user);

    // Assert
    expect(result.status).toBe(200);
    expect(result.message).toBe("User registered successfully");
    // Check if sendMail was called with the correct arguments
    expect(mockSendMail).toHaveBeenCalledWith(user.email, user.name);
    expect(mockSendMail).toHaveBeenCalledTimes(1);

  });
})