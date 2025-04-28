import { DataBase, User } from "./DataBase";

export class UserCredentialsDataAccess {

    // consumer class injection et consommation des méthodes de la classe DataBase
    private userCredentialsDataBase = new DataBase();

    public async addUser(user: User) {
      const accountId = await this.userCredentialsDataBase.insert(user);
       return accountId;
    }

    public async getUserById(id: string){
      const user = await this.userCredentialsDataBase.getBy('id', id);
      return user;
    }

    public async getUserByUserName(name: string){
      const user = await this.userCredentialsDataBase.getBy('name', name);
      return user;
    }
}
