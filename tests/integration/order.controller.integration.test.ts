import { Request, Response } from 'express';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { seedDatabase, setupTestDB, tearDownTestDB } from '../../src/config/setup';
import orderController from '../../src/controllers/order.controller';
import Inventory from '../../src/models/inventory';
import Order from '../../src/models/order';
import Product from '../../src/models/product';
import User from '../../src/models/user';
import { IOrder, OrderStatus } from '../../src/types';



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