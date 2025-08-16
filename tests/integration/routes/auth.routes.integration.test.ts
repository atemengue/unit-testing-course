import express, { Express } from 'express';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { seedDatabase, setupTestDB, tearDownTestDB } from '../../../src/config/setup';
import UserModel from '../../../src/models/user';
import authRoutes from '../../../src/routes/auth.routes';
import bodyParser = require('body-parser');

const app : Express = express();

describe("Auth Routes",  () => {

  beforeAll(async () => {
    await setupTestDB();
    await seedDatabase();

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(authRoutes);
  });

  afterAll(async() =>{
    await tearDownTestDB()
  })

  describe("SignUp Tests Suites", () => {

    it("doit retourner status 200 avec un token", async () => {
      // Arrange
      const data = {
        name: "Noah Junoir",
        password: "1245AFCeft@",
        email: "noahjunoir@email.com"
      }
      // Act &  Assert
      await request(app).post('/api/signup').send(data).expect(200);

      const users = await UserModel.find();

      expect(users.length).toBe(3);

    });

    it.todo("doit retourner Invalid Params");
    it.todo("doit retourner status 500 request error")

  });


  // describe("SignIn Tests Suites", () => {

    
  // })

})