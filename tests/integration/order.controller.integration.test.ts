import { Request, Response } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import orderController from '../../src/controllers/order.controller';
import Category from '../../src/models/category';
import Inventory from '../../src/models/inventory';
import Order from '../../src/models/order';
import Product from '../../src/models/product';
import User from '../../src/models/user';
import { IOrder, OrderStatus } from '../../src/types';


let mongodb: MongoMemoryServer;

const seedDatabase = async () => {
  
    // nettoyage
  await Category.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();

  // seed data
  await Category.create({ name: 'Coffee Chaud', description: "", imageUrl: "www.imageurl.test"});
  const category = await Category.create({ name: 'Coffee Froid', description: "", imageUrl: "www.imageurl.test"});

  const product = await Product.create({
    name: 'ICE LATE',
    description: "Ice late coffee froid",
    imageUrl: "url-image",
    stock: 5,
    categoryId: category?.id
  });

  await Inventory.create({
    quantity: product.stock,
    productId: product?.id
  });
  
  const user = await User.create({
    name: 'herve',
    email: "herve@email.com",
    password: "12345678"
  })
}

const setupTestDB = async () => {

  mongodb = await MongoMemoryServer.create();
  const uri = mongodb.getUri();

  await mongoose.connect(uri);

}

const tearDownTestDB = async () => {
  // 1 suppression des collections
  const collections = await mongoose.connection?.db?.collections();
  if (collections) {
    for(let collection of collections) {
      await collection.deleteMany({});
    }
  }
  // 2. deconnexion instance
    await mongoose.disconnect();

  // 3. arret du serveur
  await mongodb.stop()

}



describe("OrderController Tests Suites", () => {
  
  beforeAll( async () => {
    await setupTestDB();
    await seedDatabase();
  });

  afterAll(async() => {
    await tearDownTestDB();
  })

  describe("CreateOrder Tests Suites", () => {

    it("doit creer une commande et mettre a jour l'inventaire et retourner le status 200 ", async () => {

      // Arrange
      const user = await User.findOne();
      const product = await Product.findOne();

      const orderData : IOrder = {
        userId: user?.id,
        status: OrderStatus.Created,
        productId: product?.id,
        shippingAddress: "Yaounde Mendong",
        orderDate: new Date(),
        quantity: 3
      }

      const req =  {
        body: orderData
      } as Request

      const res  = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
      } as unknown as Response;


      // Act
      await orderController.createOrder(req, res)

      // Assert
      expect(res.status).toHaveBeenCalledWith(201);

      // Assert sur les commandes(orders)
      const orders =  await Order.find();
      console.log(orders.length, 'nombres de commandes');
      expect(orders.length).toBeGreaterThan(0);

      // Assert sur l'inventaires
      const inventoryData = await Inventory.findOne({ productId: product?.id });
      expect(inventoryData).not.toBeNull();
      expect(inventoryData?.quantity).toBe(2);

    });

  })

})