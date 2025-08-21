import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { IInventory, IInventoryService, IProductService } from '../types';
class ProductController {

  private readonly productService: IProductService;
  private readonly inventoryService: IInventoryService
  
  constructor(productService: IProductService, inventoryService: IInventoryService) {
    this.productService = productService;
    this.inventoryService = inventoryService;
  }

  create =  async (req: Request, res: Response)=> {

    
    const data = req.body;
    
    console.log(data, 'DATA');

    
    try {
      const product = await this.productService.createProduct(data);
      
      const inventoryData: IInventory = {
        productId: product.id as Types.ObjectId,
        quantity: product.stock,
      }
      if (product) {
        await this.inventoryService.createInventory(inventoryData)
        res.status(201).send(product);
      }
    } catch (error) {
       res.status(500).send(error);
    }
  }

   getById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
      const product = await this.productService.getById(id);
      if(!product) {
        res.status(204).send(product)
      } else {
        res.status(200).send(product)
      }
    } catch (error) {
      res.status(500.).send(error);
    }
  }

  lists =  async (_req: Request, res: Response) => {
    try {
    const products = await this.productService.lists();
    if (products && products.length === 0) {
       res.status(204).send(products);
    } else {
      res.status(200).send(products);
    }
    } catch (error) {
      res.status(400).send(error);
    }
  }

  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body;
    try {
      await this.productService.updateProduct(id, data);
     res.status(201).send("updated!");
    } catch (error) {
      res.status(500).send(error);
    }
  }

  delete = async (req: Request, res: Response) => {
    const id = req.params.id;
     try {
      await this.productService.deleteProduct(id)
      res.status(204).send()
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default ProductController;

