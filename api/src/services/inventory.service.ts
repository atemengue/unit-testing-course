import Inventory from '../models/inventory';
import { IInventory, IInventoryService, IProduct } from '../types';

export interface CheckInterface {
  isAvailable: boolean,
  quantity?: number
  message?: string
}

export interface IResult {
  isCreated?: boolean,
  isUpdated?: boolean,
  product?: IProduct
  message: string
}

class InventoryService  implements IInventoryService {

  constructor(){}

  async checkInventory(id: string): Promise<CheckInterface | undefined> { 
    try {
      const inventory = await Inventory.findOne({
        productId: id
      });

      if(inventory === null) {
        return {
          isAvailable: false,
          quantity: 0,
          message: "Product Not Found"
        }
      } else {
        return {
          isAvailable: true,
          quantity: inventory.quantity
        }
      }
    } catch (error) {
      return {
        isAvailable: false,
        message: `Error ${error}`
      }     
    }
  }

  async createInventory(inventory: IInventory): Promise<IResult> {
    const response = await Inventory.create(inventory);
    if(response) {
      return { isCreated: true, message: "inventory created" }
    }
    return {
      isCreated: false,
      message: "error"
    }
  }

  async updateInventory(id: string, quantity: number): Promise<IResult>{
    const filter = { productId: id };
    try {
       await Inventory.findOneAndUpdate(
        filter, { $inc: { quantity:-quantity }}, { new: true }
      )
      return {
        message: "Inventory Updated!",
        isUpdated: true
      }

    } catch (error) {
      return {
        message: "Inventory!",
        isUpdated: false
      }
    }
  }
}

export default InventoryService;
