
export const users = ["newuser1@pluralsight.com"]

export async function isValidUserName(userName) {
  // Placeholder for request checking if username is valid
  if (!userName || !userName.includes('@')) {
      return false;
  }
      return true;
}