import { genSalt, hash } from 'bcrypt';
import User from '../models/user';
import { verify } from '../utils/verify';

class SignUpController {

  async handle(email: string,  password: string, name: string){
    const isValid = verify(name, password, email);
    if (isValid) {
      const salt  = await genSalt(10);
      const hashedPassword = await hash(password, salt);
      await User.create({
        email: email,
        name: name,
        password: hashedPassword
      })
    }
  }

}