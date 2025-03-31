// import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
// // describe("Async Code Testing", () => {
// //   it("Should should return a promise a resolve an array of numbers", async () => {
// //       const result = await fetchData();
// //       expect(Array.isArray(result)).toBeTruthy();
// //       expect(Array.length).toBeGreaterThan(0);
// //   })
// // })
// // vi.mock(import("../../src/app/async/async"), async (importOriginal) => {
// //   const actual = await importOriginal()
// //   return {
// //     ...actual,
// //     isValidUserName: vi.fn()
// //   }
// // })

// // Mock the module containing the functions you want to test
// vi.mock('../../src/app/async/async', async () => {
//   // Get the original implementation
//   const actual = await import('../../src/app/async/async');
  
//   // Return a modified version with mocked isValidUserName
//   return {
//     ...actual,
//     isValidUserName: vi.fn()
//   };
// })

// import { createAccount, fetchData, isValidUserName } from '../../src/app/async/async';


// // describe("Async Code Testing", () => {
// //   it("Should should return a promise with reject operation", async () => {

// //     try {
// //       const result = await fetchData();
// //     } catch (error) {
// //       expect(error).toHaveProperty('reason');
// //       expect(error.reason).toMatch(/fail/i)
// //     }

// //   })
// // });

// // describe("create Account Suites Tests", () => {

// //   it("Should Throw an error if username name is invalid", async () => {

// //     // mock isValidUserName

// //     vi.mocked(isValidUserName).mockr
// //     const error = await createAccount('test@email.com');
// //     console.log(error);

// //   })
// // })


// // describe("isValidUserName Tests", () => {
// //   it("Should return false for invalid usernames", async () => {
// //     expect(await isValidUserName("invalidusername")).toBe(false);
// //     expect(await isValidUserName("")).toBe(false);
// //     expect(await isValidUserName(null)).toBe(false);
// //   });

// //   it("Should return true for valid usernames", async () => {
// //     expect(await isValidUserName("valid@email.com")).toBe(true);
// //   });
// // });


// describe("createAccount Tests", () => {
//   beforeEach(() => {
//     // Clear all mocks before each test
//     vi.clearAllMocks();
//   });

//   it("Should throw an error if username is invalid", async () => {
//     // Mock isValidUserName to return false (resolved Promise)
//     isValidUserName.mockResolvedValue(true);

//     await expect(createAccount("invalidusername")).rejects.toThrow(
//       new Error("Please enter a valid username")
//     );
//   });

//   it("Should resolve with user data if username is valid and does not exist", async () => {
//     // Mock isValidUserName to return true
//     isValidUserName.mockResolvedValue(true);

//     const result = await createAccount("newuser2@pluralsight.com");
//     expect(result).toEqual({
//       data: {
//         userId: 1,
//         username: "newuser2@pluralsight.com",
//       },
//     });
//   });

//   it("Should reject if username already exists", async () => {
//     // Mock isValidUserName to return true
//     isValidUserName.mockResolvedValue(true);

//     await expect(createAccount("newuser1@pluralsight.com")).rejects.toBe(
//       "User already exists"
//     );
//   });
// });



// describe("createAccount Tests", () => {

//   afterEach(() => {
//     vi.clearAllMocks();
//   });
  

//   it("Should throw an error if username is invalid", async () => {
//     // Mock to return a resolved Promise with false
//     isValidUserName.mockResolvedValue(false);

//     await expect(createAccount("invalidusername")).rejects.toThrow(
//       "Please enter a valid username"
//     );
//   });

//   it("Should resolve with user data if username is valid and does not exist", async () => {
//     vi.mocked(isValidUserName).mockReturnValueOnce(false);

//     const result = await createAccount("newuser2@pluralsight.com");
//     expect(result).toEqual({
//       data: {
//         userId: 1,
//         username: "newuser2@pluralsight.com",
//       },
//     });
//   });

//   it("Should reject if username already exists", async () => {
//     vi.mocked(isValidUserName).mockReturnValueOnce(true);

//     await expect(createAccount("newuser1@pluralsight.com")).rejects.toBe(
//       "User already exists"
//     );
//   });
// });


import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createAccount } from '../../src/app/async/async';
import { isValidUserName } from '../../src/app/async/isValid';


vi.mock('../../src/app/async/isValid', () => {
  return {
    isValidUserName: vi.fn(),
  };
});

describe("createAccount Tests", () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });
  
  it("Should throw an error if username is invalid", async () => {
    // Mock isValidUserName to return false
    // vi.mocked(isValidUserName).mockReturnValue(false);
    vi.spyOn(isValidUserName, 'isValidUserName').mockResolvedValue(false);

    
    await expect(createAccount("invalidusername")).rejects.toThrow(
      "Please enter a valid username"
    );
  });
});

  
  // it("Should resolve with user data if username is valid and does not exist", async () => {
  //   // Mock isValidUserName to return true
  //   isValidUserName.mockResolvedValue(true);
    
  //   const result = await createAccount("newuser2@pluralsight.com");
  //   expect(result).toEqual({
  //     data: {
  //       userId: 1,
  //       username: "newuser2@pluralsight.com",
  //     },
  //   });
  // });
  
  // it("Should reject if username already exists", async () => {
  //   // Mock isValidUserName to return true
  //   isValidUserName.mockResolvedValue(true);
    
  //   await expect(createAccount("newuser1@pluralsight.com")).rejects.toBe(
  //     "User already exists"
  //   );
  // });


// import { beforeEach, describe, expect, it, vi } from 'vitest';
// import * as asyncModule from '../../src/app/async/async';

// describe("createAccount Tests", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//     vi.restoreAllMocks();
//   });
  
//   it("Should throw an error if username is invalid", async () => {
//     // Create a spy that will make isValidUserName return false
//     const isValidSpy = vi.spyOn(asyncModule, 'isValidUserName');
    
//     // This is the key part - we need to replace the implementation
//     isValidSpy.mockImplementation(() => Promise.resolve(false));
    
//     await expect(asyncModule.createAccount("invalidusername")).rejects.toThrow(
//       "Please enter a valid username"
//     );
//   });
  
  // it("Should resolve with user data if username is valid and does not exist", async () => {
  //   const isValidSpy = vi.spyOn(asyncModule, 'isValidUserName');
  //   isValidSpy.mockImplementation(() => Promise.resolve(true));
    
  //   const result = await asyncModule.createAccount("newuser2@pluralsight.com");
  //   expect(result).toEqual({
  //     data: {
  //       userId: 1,
  //       username: "newuser2@pluralsight.com",
  //     },
  //   });
  // });
  
  // it("Should reject if username already exists", async () => {
  //   const isValidSpy = vi.spyOn(asyncModule, 'isValidUserName');
  //   isValidSpy.mockImplementation(() => Promise.resolve(true));
    
  //   await expect(asyncModule.createAccount("newuser1@pluralsight.com")).rejects.toBe(
  //     "User already exists"
  //   );
  // });
// });