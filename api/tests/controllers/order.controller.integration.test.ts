import { Request, Response } from 'express';
import { describe, expect, it, vi } from 'vitest';
import orderController from '../../src/controllers/order.controller';
import Inventory from '../../src/models/inventory';
import OrderModel from '../../src/models/order';
import ProductModel from '../../src/models/product';
import User from '../../src/models/user';
import { IOrder, OrderStatus } from '../../src/types';
import { setupTestEnvironment } from '../config/setup';

// Database setup
setupTestEnvironment();

// Use the real implementation (no mocking)
const sut = orderController;

describe("Create Order", () => {
  it("should create order and update inventory", async () => {
    // Arrange
    const user = await User.findOne({});
    const product = await ProductModel.findOne({});

    const initialInventory = await Inventory.findOne({ productId: product?.id });
    expect(initialInventory).not.toBeNull();
    expect(initialInventory?.quantity).toBe(150);
    
        const mockOrder : IOrder = {
          userId: user?.id,
          status: OrderStatus.Created,
          productId: product?.id, // Make sure this matches what your controller expects
          shippingAddress: 'Yaounde 237',
          quantity: 100,
          orderDate: new Date()
        };

    const req = {
      body: mockOrder
    } as Request;
    
    const res = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn()
    } as unknown as Response;
    
    // Act
    await sut.createOrder(req, res);
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(201);
    
    // Assert Order state in database
    const orders = await OrderModel.find();
    expect(orders.length).toBeGreaterThan(0);
    
    // Assert Inventory state in database - should be updated
    const updatedInventory = await Inventory.findOne({ productId: product?.id });
    expect(updatedInventory).not.toBeNull();
    expect(updatedInventory?.quantity).toBe(50);
  });
});

















// vi.mock("../../src/services/inventory.service.ts", async() => {
//   const actual = await vi.importActual<typeof import('../../src/services/inventory.service')>('../../src/services/inventory.service.ts');
//   return {
//     ...actual,
//     InventoryService: vi.fn(() => ({
//       updateInventory: vi.fn(),
//       checkInventory: vi.fn(),
//     }))
//   }
// });
//      //Database setup
//     setupTestEnvironment();
    
    
//     beforeEach(() => {
//       // Clear all mocks before each test
//       vi.clearAllMocks();
//     });
    
//     describe("Create Order", () => {
 
//       const sut = orderController;

//        it("should create order with good", async () => {     
    
//         const user = await User.findOne({});
//         const product = await ProductModel.findOne({});

//         console.log(user);
//         console.log(product);
        
//         // Arrange
//         const mockOrder : IOrder = {
//           userId: user?.id,
//           status: OrderStatus.Created,
//           product: product?.id, // Make sure this matches what your controller expects
//           shippingAddress: 'Yaounde 237',
//           qnantity: 100,
//           orderDate: new Date()
//         };

//         vi.mocked(InventoryService).mockImplementation(() => ({
//           checkInventory: vi.fn().mockResolvedValue({
//             isAvailable: true,
//             quantity: 2500
//           }),

//           updateInventory: vi.fn().mockResolvedValue({
//             isUpdated: true,
//             message: "Inventory updated"
//           }),

//           createInventory: vi.fn()
//         }));
        
//         const req = {
//           body: mockOrder
//         } as Request;
        
//         const res = {
//           status: vi.fn().mockReturnThis(),
//           send: vi.fn()
//         } as unknown as Response;
        
//         // Act
//         await sut.createOrder(req, res);
        
//         // Assert
//         expect(res.status).toHaveBeenCalledWith(201);
        
//         // Assert Order state
//         const orders = await OrderModel.find();
//         expect(orders.length).toBeGreaterThan(0);


//         // Assert Product state
//         const product = await ProductModel.findOne({});
//         console.log(product1);


//         // Assert Inventory service calls
//      // expect(vi.mocked(InventoryService).mock.instances[0].checkInventory).toHaveBeenCalledWith(product?.id);

//         // expect(mockInventoryService.checkInventory).toHaveBeenCalledTimes(1);
//         // expect(mockInventoryService.checkInventory).toHaveBeenCalledWith(product?.id);
//         // expect(mockInventoryService.updateInventory).toHaveBeenCalledTimes(1);
//         // expect(mockInventoryService.updateInventory).toHaveBeenCalledWith(product?.id, -100);
//       });
//     });

