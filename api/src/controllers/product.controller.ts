import { Request, Response } from 'express';
import { IProductService } from '../types';

class ProductController {

  private readonly productService: IProductService;
  
  constructor(productService: IProductService) {
    this.productService = productService;
  }

  create =  async (req: Request, res: Response)=> {
    const data = req.body;
    try {
      const product = await this.productService.createProduct(data);
      if (product) {
        // update inventory
        res.status(201).send(product);
      }
    } catch (error) {
       res.status(500).send(error);
    }
  }

   readById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
      const product = await this.productService.readProductById(id);
      if(!product) {
        res.status(204).send(product)
      } else {
        res.status(200).send(product)
      }
    } catch (error) {
      res.status(500.).send(error);
    }
  }

  read =  async (_req: Request, res: Response) => {
    try {
    const products = await this.productService.readAllProduct();
    if (products.length === 0) {
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

