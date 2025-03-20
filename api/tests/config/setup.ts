import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, beforeAll } from 'vitest';
import Category from '../../src/models/category'; // Adjust the path as needed
import Inventory from '../../src/models/inventory';
import Order from '../../src/models/order';
import Product from '../../src/models/product'; // Adjust the path as needed
import User from '../../src/models/user';
import { OrderStatus } from '../../src/types';



let mongod: MongoMemoryServer;

/**
 * Seed the database with initial data.
 */
const seedDatabase = async () => {
  // Clear existing data
  await Category.deleteMany({});
  await Product.deleteMany({});
  await User.deleteMany();

  // Seed categories
  const category1 = await Category.create({ name: 'Electronics', description: '', imageUrl: '' });
  await Category.create({ name: 'Books', description: '', imageUrl: '' });

  // Seed products
  const product = await Product.create({
    name: 'Latte',
    description: 'description',
    imageUrl: 'url-image',
    stock: 150,
    price: 1500,
    categoryId: category1.id,
  });

  await Inventory.create({
    quantity: product.stock,
    productId: product.id
  })

  const user = await User.create({
    name: 'regis',
    email: 'regis@test.com',
    password: '12345678'
  })

  await Order.create({
    _id: '67dbb5f670d04d702c94a999',
    userId: user?.id,
    status: OrderStatus.Created,
    productId: product?.id, // Make sure this matches what your controller expects
    shippingAddress: 'Yaounde 237',
    quantity: 100,
    orderDate: new Date()
    })
  

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