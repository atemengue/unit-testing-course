import { genSalt, hash } from 'bcrypt';
import { Request } from 'express';
import JWT from 'jsonwebtoken';
import { ParamsError } from '../errors';
import User from '../models/user';
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
      throw new ParamsError()
    }

    const salt  = await genSalt(10);
    const hashedPassword = await hash(password, salt);    
    
    const accessToken = JWT.sign({ email, name}, secret);
    
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
      body: { message: "Internal Server error", error}
    }
  }
}
}

export default SignUpController;