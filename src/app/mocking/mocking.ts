

// utilisation des examples sur le mocking simple et le store
interface IResult {
  message: string
}

const businessHours = [9, 18];

export function purchase() : IResult {
  const currentHour = new Date().getHours();
  const [open, close] = businessHours;

  if (currentHour > open && currentHour < close){
    return { message: 'Success' };
  }

  return { message: 'Error'};
}

interface IEmailGateway {
  sendGreetingsEmail(userEmail: string): void;
}

// Mock simple example
interface IDatabase {
  getNumberOfUsers(): number;
}

class Report {
  numberOfUsers: number;

  constructor(numberOfUsers: number) {
      this.numberOfUsers = numberOfUsers;
  }
}

class Controller {
  private emailGateway: IEmailGateway | null = null;
  private database: IDatabase | null = null;

  constructor(emailGateway: IEmailGateway);
  constructor(database: IDatabase);

  constructor(emailGatewayOrDatabase: IEmailGateway | IDatabase) {
      if ('sendGreetingsEmail' in emailGatewayOrDatabase) {
          this.emailGateway = emailGatewayOrDatabase;
      } else if ('getNumberOfUsers' in emailGatewayOrDatabase) {
          this.database = emailGatewayOrDatabase;
      }
  }

  greetUser(userEmail: string): void {
      if (!this.emailGateway) {
          throw new Error("Email gateway is not initialized.");
      }
      this.emailGateway.sendGreetingsEmail(userEmail);
  }

  createReport(): Report {
      if (!this.database) {
          throw new Error("Database is not initialized.");
      }
      const numberOfUsers = this.database.getNumberOfUsers();
      return new Report(numberOfUsers);
  }
}