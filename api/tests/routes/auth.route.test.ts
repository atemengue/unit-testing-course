import bodyParser from 'body-parser';
import express, { Express, response } from 'express';
import request from 'supertest';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import User from '../../src/models/user';
import authRoutes from '../../src/routes/auth.routes';
import { setupTestEnvironment } from '../config/setup';

const app : Express = express();

setupTestEnvironment();

vi.mock("../../src/models/user.ts",  async (importOriginal) => {
  const original = await importOriginal<typeof import("../../src/models/user.ts")>();
  return {
    ...original,
    create: vi.fn()
  }
});

describe('Auth Routes', () => {
  // TODO: Add tests for category routes

  beforeAll(() => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(authRoutes)
  });

  describe.skip("SignUp Route", () => {
    it('should return 200 with token', async () => {
      const data = { 
          name: 'Regis Atemengue',
          password: '123AFECDCewf',
          email: 'testuser1@gmail.com'
      }
      // Act
      await request(app)
      .post('/api/signup')
      .send(data)
      .expect(200)

    })

    it('should return 500 request error', async () => {
      const data = { 
          name: 'Regis Atemengue',
          password: '123AFECDCewf',
          email: 'testuser1@gmail.com'
      };

      // mockedailt
      vi.spyOn(User, 'create').mockRejectedValueOnce(new Error('Error creating user'));

      // Act
      await request(app)
      .post('/api/signup')
      .send(data)
      .expect(500)
      
      // Assert
    })

    it('should return invalid params', async () => {
      const data = { 
          name: 'Regis Atemengue',
          password: '123AFE',
          email: 'testuser1@gmail.com'
      };

      // Act
      await request(app)
      .post('/api/signup')
      .send(data)
      .expect(500)
      
    })
  })

  describe("SignIn Route", () => {


    it.todo('should return 200 with token', async () => {

      const users = await User.find();
      const data = { 
          name: 'Regis Atemengue',
          password: '123AFECDCewf',
      }
      // Act
      const response = await request(app)
      .post('/api/signin')
      .send(data)
      .expect(200);

      console.log(response.body);
      expect(response.body.token).toBeTruthy();
      expect(response.body.message).toMatch(/successful/i);


    })

    it('should return 400 request error', async () => {
      const data = { 
          name: '',
          password: '',
      };

      const response = await request(app)
      .post('/api/signin')
      .send(data)
      
      // Assert
      expect(response.status).toBe(400);
      expect(response.body.message).toMatch(/name and password are required/i);

    })

    it('should return Invalid Credentials', async () => {
      const data = { 
          name: 'Regis Atemengue',
          password: '123AFEsdfsdf',
          email: 'testuser1@gmail.com'
      };

      // Act
      const response = await request(app)
      .post('/api/signin')
      .send(data)
      
      expect(response.body.message).toMatch(/error/i);
      
    })
  })

});
