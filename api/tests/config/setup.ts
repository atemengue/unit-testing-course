import { cp } from 'fs';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, beforeAll } from 'vitest';
import Category from '../../src/models/category'; // Adjust the path as needed
import Product from '../../src/models/product'; // Adjust the path as needed


let mongod: MongoMemoryServer;

/**
 * Seed the database with initial data.
 */
const seedDatabase = async () => {
  // Clear existing data
  await Category.deleteMany({});
  await Product.deleteMany({});

  // Seed categories
  const category1 = await Category.create({ name: 'Electronics', description: '', imageUrl: '' });
  await Category.create({ name: 'Books', description: '', imageUrl: '' });

  // Seed products
  await Product.create({
    name: 'Latte',
    description: 'description',
    imageUrl: 'url-image',
    stock: 15,
    price: 150,
    categoryId: category1.id,
  });

  // console.log('Database seeded successfully!');
};

/**
 * Initialize the in-memory MongoDB server, Mongoose connection, and seed the database.
 */
export const setupTestDB = async () => {
  // Start MongoMemoryServer
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // Initialize Mongoose
  await mongoose.connect(uri);

  // console.log('In-memory MongoDB server started and Mongoose connected.');

  // Seed the database
  await seedDatabase();
};

/**
 * Close the Mongoose connection and stop the in-memory MongoDB server.
 */
export const teardownTestDB = async () => {

  const collections = await mongoose.connection.db?.collections();
  if (collections) {
    for (let collection of collections) {
      await collection.deleteMany({})
    }
  }
  // Clear models
  if (mongoose) {
    await mongoose.disconnect();
    // console.log('Mongoose disconnected.');
  }

  if (mongod) {
    await mongod.stop();
    // console.log('In-memory MongoDB server stopped.');
  }
};

/**
 * Setup and teardown hooks for tests.
 */
export const setupTestEnvironment = () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await teardownTestDB();
  });
};