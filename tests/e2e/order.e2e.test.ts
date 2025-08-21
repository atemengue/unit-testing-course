import express, { Express } from 'express';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { seedDatabase, setupTestDB, tearDownTestDB } from '../../src/config/setup';
import UserModel from '../../src/models/user';
import categoryRoutes from '../../src/routes/category.routes';
import orderRoutes from '../../src/routes/order.routes';
import productRoutes from '../../src/routes/product.routes';
import { InventoryService } from '../../src/services/inventory.service';
import { IOrder, IProduct, OrderStatus } from '../../src/types';
import bodyParser = require('body-parser');

let app: Express = express();


describe("e2e order test suite", () => {

  let inventoryService: InventoryService;

  beforeAll(async() => {

    inventoryService = new InventoryService();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(orderRoutes);
    app.use(productRoutes);
    app.use(categoryRoutes);

    await setupTestDB();
    await seedDatabase();

  });

  afterAll(async () => {
    await tearDownTestDB();
  })


  describe("En tant que utilisateur un nouvel lorsque je passe une commande de 02 cafés sur 100", () => {
    it("le status de la réponse = 201, le stock restant = 98 et la commande doit etre save dans la DB", async () => {

    const user = await UserModel.findOne({ name: 'regis '});

    const response = await request(app).get('/api/categories');
    const category = response.body[1];

      const coffee  = {
        name: 'Irish Coffee',
        description: 'Irish Coffee',
        price: 500,
        stock: 100,
        imageUrl: 'url.com',
        categoryId: category?._id 
      };

     const createCoffeeResponse = await request(app).post("/api/product").send(coffee);

     // order
     const order =  {
      userId: user?.id,
      status: OrderStatus.Created,
      quantity: 2,
      shippingAddress: "yaounde",
      orderDate: new Date(),
      productId: coffee,
     } as unknown as IOrder

    
     const createOrderResponse = await request(app).post('/api/order').send(order);

     expect(createOrderResponse.status).toBe(201);
     expect(createOrderResponse.body.status).toBe('created');

     const id = createOrderResponse.body.productId;

     // check inventory;
     const product = inventoryService.checkInventory(id);



     


    })
  })
})