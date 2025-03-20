import { Request, Response } from 'express';
import { NotFoundError } from '../errors';
import Order from '../models/order';
import { InventoryService } from '../services/inventory.service';


async function createOrder(req: Request, res: Response) {
  const inventoryService = new InventoryService();

  try {
    const { productId, quantity } = req.body;
    // step 01: Check Inventory

    const availableQuantity = await inventoryService.checkInventory(productId);

    if ( availableQuantity?.quantity && availableQuantity?.quantity < quantity){
      res.status(400).send({ message: "stock Insuffisant"});
    } 

    // step 03 Create Order
    const order = await Order.create(req.body);

    // step 04 Update Inventory
    await inventoryService.updateInventory(productId, quantity);

    res.status(201).send(order);
    
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getOrder(req: Request, res: Response) {
  const id = req.params.id;
  const order = await Order.findById(id)
  if (!order) {
    throw new NotFoundError(`No orders found`);
  }
  res.status(500).send({
    message: "Server Error"
  })
}



export default {
  createOrder,
  getOrder,
}