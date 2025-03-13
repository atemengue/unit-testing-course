import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { HttpResponse } from '../protocols/http';
export class SignInController {

  private secretKey: string = process.env.JWT || "1234";
  
  handle = async (req: Request): Promise<HttpResponse> => {
    
    try {
      
      const { username, password } = req.body;
      // Validate request body
      if (!username || !password) {
        return {
          status: 400,
          body: { message: 'Username and password are required' }
        }
      }
        const user = await User.findOne({ where: { username } });
        if (!user) {
          throw new Error('User not found');
        }
  
        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }
        // Generate a JWT token
        const token = jwt.sign({ userId: user.id, username: user.name }, this.secretKey, {
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
        return {
          status: 500,
          body: { message: error}
        }
    }
  };
}

export default SignInController