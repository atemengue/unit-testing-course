import express, { Express } from 'express';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { seedDatabase, setupTestDB, tearDownTestDB } from '../../../src/config/setup';
import orderRoutes from '../../../src/routes/order.routes';


let app: Express = express();

describe("Order Routes", () => {

  beforeAll(async() => {
    
    await setupTestDB();
    await seedDatabase()
    app.use(orderRoutes);
  
  })

    afterAll(async() =>{
      await tearDownTestDB()
  })

  describe("/api/order/id", () => {

    it.todo("POST doit creer une commande");

    it("GET doit retourner une commande", async () => {
      // Arrange
      const id = '67dbb5f670d04d702c94a999';
      // Act
      const response = await request(app).get(`/api/order/${id}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body._id).toBe('67dbb5f670d04d702c94a999');
    });

    it("GET doit retourner 500 request error", async () => {
     // Arrange
     const id = '67dbb5f670d04d702c94a949';
     // Act
     const response = await request(app).get(`/api/order/${id}`);
     // Assert
     expect(response.status).toBe(500);
    });

  })

})