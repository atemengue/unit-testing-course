import bodyParser from 'body-parser';
import express, { Express, Request, Response } from 'express';
import { beforeEach } from 'node:test';
import request from 'supertest';
import { beforeAll, describe, expect, it } from 'vitest';
import categoryRoutes from '../../src/routes/category.routes';
import { setupTestEnvironment } from '../config/setup';



let app: Express = express();

setupTestEnvironment();

describe('Category Routes', () => {

  beforeAll(() => {
    
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(categoryRoutes)
  })

  it('should return 201 with a category', async () => {
    // Arrange
    const category = {
      name: 'test category',
      description: 'test description',
      imageUrl: 'http://test.com/image.jpg'
    }

    // Act
    const response = await request(app)
      .post('/api/category')
      .send(category)
      .expect(201);

    // Assert
    expect(response.body).toHaveProperty('_id');
    expect(response.body.name).toBe(category.name);

  })
});