import bodyParser from 'body-parser';
import express, { Express } from 'express';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { seedDatabase, setupTestDB, tearDownTestDB } from '../../../src/config/setup';
import categoryRoutes from '../../../src/routes/category.routes';


let app: Express = express();

describe('Category Routes', () => {

  beforeAll(async() => {
    
    await setupTestDB();
    await seedDatabase()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(categoryRoutes)
  })

  afterAll(async() =>{
      await tearDownTestDB()
  })

  it('doit retourner 201 avec une categorie de café', async () => {
    // Arrange
    const category = {
      name: 'CAFE NOIR EXPRESSO',
      description: 'expresso noir',
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