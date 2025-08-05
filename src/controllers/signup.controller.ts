import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { ParamsError } from '../errors';
import User from '../models/user';
import { hashed } from '../utils/hashed-password';
import { verify } from '../utils/verify';
import { HttpResponse } from './../protocols/http';

const secret = '1234';
class SignUpController {
  async handle(req: Request): Promise<HttpResponse>{
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password;

    try {
    
      const isValid = verify(name, password, email);
      
    if(!isValid) {
      // Voir les elements des erreurs
      throw new Error("Invalid Params");
    }

    const hashedPassword = await hashed(password); 
    
    const accessToken = sign({ email, name}, secret);
 
    
    await User.create({
        email: email,
        name: name,
        password: hashedPassword
    })
    return {
      status: 200,
      body: accessToken
    }

  }catch (error) {
    return {
      status: 500,
      body: { message: error}
    }
  }
}
}

export default SignUpController;