export class User {
  id: string;
  username: string;
  isPremium: boolean = false;

  constructor(id: string, username: string) {
    this.id = id;
    this.username = username
  }
}

export async function userExists(username:string) {
  const existingUsers = ["regis@propelize.com"];
  if (existingUsers.includes(username)) {
    return true;
  }
  return false;
}

export function createUserId(): number{
  return 2
}