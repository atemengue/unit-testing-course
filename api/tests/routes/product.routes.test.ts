import express, { Express, Request, Response } from 'express';
import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import ProductModel from '../../src/models/product';
import productRoutes from '../../src/routes/product.routes';
import { setupTestEnvironment } from '../config/setup';

let app: Express = express();

setupTestEnvironment();
describe("Product Routes", () => {

  beforeEach( async () => {  
    app.use(productRoutes);
  })

  describe("/api/products", () => {
    it("GET should return a list of products", async () => {
      // Arrange
      // Act
      const response  = await request(app).get("/api/products");
      // Assert
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it("GET should return 204 if list are empty products", async () => {
      // Arrange
      await ProductModel.deleteMany();
      // Act
      const response = await request(app).get("/api/products");
      // Assert
      expect(response.status).toBe(204);
      expect(Array.isArray(response.body)).toBe(false);
      expect(response.body).toEqual({})
    });



  })

})