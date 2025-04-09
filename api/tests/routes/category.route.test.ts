import express, { Express, Request, Response } from 'express';
import { beforeEach } from 'node:test';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import categoryRoutes from '../../src/routes/category.routes';
import { setupTestEnvironment } from '../config/setup';



let app: Express = express();

setupTestEnvironment();

describe('Category Routes', () => {
  // TODO: Add tests for category routes

  beforeEach(() => {
    app.use(categoryRoutes)
  })

  it('should return 200 with a category', async () => {
    // Arrange
    const categoy = {
      name: 'test category',
      description: 'test description',
      imageUrl: 'http://test.com/image.jpg'
    }

    // Act
    const response = await request(app)
      .post('/api/categories')
      .send(categoy)
      .expect(200);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(categoy.name);

  })
});