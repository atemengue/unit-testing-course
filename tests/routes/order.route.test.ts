import express, { Express } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import orderRoutes from '../../src/routes/order.routes';
import { setupTestEnvironment } from '../config/setup';


let app: Express = express();

setupTestEnvironment();
describe("Order Routes", () => {


  beforeEach (() => {
  app.use(orderRoutes);
  
  })

  describe("/api/order/id", () => {

    it("GET should return a order", async () => {
      // Arrange
      const id = '67dbb5f670d04d702c94a999';
      // Act
      const response = await request(app).get(`/api/order/${id}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body).toBeTruthy();
      expect(response.body._id).toBe('67dbb5f670d04d702c94a999');
    });

    it("GET should return 500 request error", async () => {
     // Arrange
     const id = '67dbb5f670d04d702c94a949';
     // Act
     const response = await request(app).get(`/api/order/${id}`);
     // Assert
     expect(response.status).toBe(500);
    });

  })

})