import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { seedDatabase, setupTestDB, tearDownTestDB } from '../../src/config/setup';
import SignUpController from '../../src/controllers/signup.controller';
import authRoutes from '../../src/routes/auth.routes';

const app: Express = express();

describe("e2e signUp test suite", () => {

    beforeAll(async() => {
    
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
  
      app.use(authRoutes);
  
      await setupTestDB();
      await seedDatabase();
  
    });
  
    afterAll(async () => {
      await tearDownTestDB();
    })

  describe("En tant que nouvel utilisateur, lorsque je m'inscris avec des idenfiants valides", () => {
    it("le status de réponse est 200 est renvoyé avec le token et le nouvel utilisateur doit etre enregistré dans la BD", () => {

      const data = {
        name: "test12345",
        email: "test@email.com",
        password: 'test1234ABCD'
      }

    })
  })

})