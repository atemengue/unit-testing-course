import { describe } from 'vitest';
import { registerUser } from '../../src/app/register/registerUser';

describe("RegisterUser (mock Version)", () => {

  it("Should register a new user", () => {

    // Arrange
    const user = {
      name: "John Doe",
      email: "test@email.com"
    };
    
    // Mock the sendMail function
    const sendMailStub = vi.fn();

    // Act
    const result = registerUser(user, sendMailStub);

    // Assert
    expect(result.status).toBe(200);
    expect(result.message).toBe("User registered successfully");

    // Check if sendMail was called with the correct arguments
    expect(sendMailStub).toHaveBeenCalledWith(user.email, user.name);
    expect(sendMailStub).toHaveBeenCalledTimes(1);
    
  })


});