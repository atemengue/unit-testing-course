import { genSalt, hash } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { ParamsError } from '../errors';
import User from '../models/user';
import { verify } from '../utils/verify';

const secret = '1234';


export type HttpResponse = {
  statusCode: number
  body: any
}

class SignUpController {
  async signUp(req: Request, res: Response): Promise<Response>{
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
  
      const isValid = verify(name, password, email);
      if (!isValid) {  
        throw new ParamsError("") 
      }
        // hashed password
  
        const salt  = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        
        // create user;
        await User.create({
          email: email,
          name: name,
          password: hashedPassword
        });
  
        // create accessToken
        const accessToken = jwt.sign({ email, name}, secret);

        return res.status(200).json({ accessToken });

    } catch (error) {
      return res.status(500).json({ error: error });

    }
  }
}

export default SignUpController;