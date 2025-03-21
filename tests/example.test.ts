import { describe, expect, it } from 'vitest';
import Category from '../src/models/category'; // Adjust the path as needed
import Product from '../src/models/product'; // Adjust the path as needed
import { setupTestEnvironment } from './config/setup';

// Setup the test environment
setupTestEnvironment();

describe('Database Tests', () => {


  it('should have seeded categories', async () => {
    const categories = await Category.find({});
    expect(categories.length).toBe(2);
  });

  it('should have seeded products', async () => {
    const products = await Product.find({});
    expect(products.length).toBe(1);
  });
});