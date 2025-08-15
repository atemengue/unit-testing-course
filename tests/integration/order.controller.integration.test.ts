import { Request, Response } from 'express';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { beforeAll, describe, expect, it, vi } from 'vitest';
import orderController from '../../src/controllers/order.controller';
import Inventory from '../../src/models/inventory';
import Order from '../../src/models/order';
import Product from '../../src/models/product';
import User from '../../src/models/user';
import { IOrder, OrderStatus } from '../../src/types';


const setupTestDB = async () => {

  const mongodb : MongoMemoryServer = await MongoMemoryServer.create();
  const uri = mongodb.getUri();

  console.log(uri);

  await mongoose.connect(uri);
  console.log("Memory Database Set")

}

beforeAll(() => {
  setupTestDB();
})


describe("OrderController Tests Suites", () => {



  describe("CreateOrder Tests Suites", () => {

    it("doit creer une commande et retour le status 200 et la commande ", async () => {

      // Arrange
      const user = await User.findOne();
      const product = await Product.findOne();

      console.log(user ,'the user');
      console.log(product, 'the product');

      const orderData : IOrder = {
        userId: user?.id,
        status: OrderStatus.Created,
        productId: product?.id,
        shippingAddress: "Yaounde Mendong",
        orderDate: new Date(),
        quantity: 50
      }

      const req =  {
        body: orderData
      } as Request

      const res  = {
        status: vi.fn().mockReturnThis(),
        send: vi.fn()
      } as unknown as Response;


      // Act
      const actual = await orderController.createOrder(req, res)


      // Assert

    });

  })

})