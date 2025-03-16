import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { NotFoundError, UnauthorizedError, } from '../errors';
import User from '../models/user';
import { HttpResponse } from '../protocols/http';
export class SignInController {

  private secretKey: string = process.env.JWT || "1234";
  
  handle = async (req: Request): Promise<HttpResponse> => {
    
    try {
      
      const { name, password } = req.body;
      // Validate request body
      if (!name || !password) {
        return {
          status: 400,
          body: { message: 'name and password are required' }
        }
      }
        const user = await User.findOne({ where: { name } });
        if (!user) {
          // throw new Error('User not found');
          throw new NotFoundError()
        }
  
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new UnauthorizedError("Invalid Credentials")
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, name: user.name }, this.secretKey, {
          expiresIn: '1h', // Token expires in 1 hour
        });
  
        // Return success response with token
        return {
          status: 200,
          body: {
            message: 'Authentication successful',
            token,
          }
        };      
    } catch (error) {
        throw error
    }
  };
}

export default SignInController