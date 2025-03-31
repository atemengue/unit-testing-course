

import { vi } from 'vitest';
import { sendEmail, smtpSend } from '../../src/app/mock/mock-example';

// vi.mock('./emailService', () => ({
//   ...vi.importActual('./emailService'),
//   smtpSend: vi.fn()
// }));

vi.mock("../../src/app/mock/mock-example.ts");


// vi.mock("../../src/app/mock/mock-example.ts", async() => {
//   const actual = await vi.importActual<typeof import('../../src/app/mock/mock-example')>('../../src/app/mock/mock-example.ts');
//   return {
//     ...actual,
//     smtpSend: vi.fn()
//   }
// });


describe('sendEmail', () => {
  it('should call smtpSend with the correct arguments and return success message', async () => {
    // Arrange
    const userEmail = 'user@example.com';
    const successMessage = `Email sent to ${userEmail} successfully.`;
    
    // Make sure to mock before calling the function
    vi.mocked(smtpSend).mockResolvedValue(successMessage);
    
    // Act
    const result = await sendEmail(userEmail);
    
    // Assert
    expect(smtpSend).toHaveBeenCalledTimes(1);
    expect(smtpSend).toHaveBeenCalledWith(userEmail, 'Hello');
    expect(result).toBe(successMessage);
  });
});