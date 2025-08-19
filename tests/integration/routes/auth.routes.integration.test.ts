import express, { Express } from 'express';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { seedDatabase, setupTestDB, tearDownTestDB } from '../../../src/config/setup';
import User from '../../../src/models/user';
import authRoutes from '../../../src/routes/auth.routes';
import bodyParser = require('body-parser');

const app : Express = express();

vi.mock("../../../src/models/user.ts", async (importOriginal) => {
  const orignal = await importOriginal<typeof import("../../../src/models/user.ts")>()
  return {
    ...orignal,
    create: vi.fn()
  }
})

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

    });

    it.skip("doit retourner Invalid Params", async () => {

      const data = {
        name: 'joe',
        email: 'test@test',
        password: '12345678'
      }

      const response = await request(app).post('/api/signup').send(data);

      expect(response.body.status).toBe(422);
      expect(response.body.name).toBe("ParamError");

   

    });
    it.skip("doit retourner status 500 request error", async () => {

          // Arrange
      const data = {
        name: "Noah Junoir",
        password: "1245AFCeft@",
        email: "noahjunoir@email.com"
      }

      // spyOn Create
      vi.spyOn(User, 'create').mockRejectedValue(new Error("Error Creatinn user"));

      // Act et Assert
       await request(app)
      .post('/api/signup')
      .send(data).expect(500)
    });
  });


  describe("SignIn Tests Suites", () => {

    it("doit me retourner status 200 auth successufly et un token", async () => {

      // Arrange
        const data = {
        name: "Noah Junoir",
        password: "1245AFCeft@",
      }

      // Assert & Act
     const response = await request(app).post("/api/signin")
     .send(data)
     .expect(200)

    expect(response.body).toHaveProperty("message");
    expect(response.body).toHaveProperty("token");
    expect(response.body.message).toMatch(/successful/i);

      
    })
    it.todo("doit me retourner status 400 et message`name and password are required`");
    it.todo("doit me retourner status 404 et message`NotFoundError`");
    it.todo("doit me retourner status 401 et message`UnauthorizedError`");
    
  })

})