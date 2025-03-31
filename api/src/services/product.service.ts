import Product from '../models/product';
import { IProduct, IProductService } from '../types';

class ProductService implements IProductService{

  constructor(){}
  
  async createProduct(product: IProduct) {
    return await Product.create(product);
  }

  async getById(id: string): Promise<IProduct | null> {
    return await Product.findById(id);
  }

  async getByName(name: string): Promise<IProduct | null> {
    return await Product.findOne({ name: name })
  }
  
  async lists() {
    return await Product.find().exec();
  }

  async updateProduct(id: string, data: IProduct) {
    return await Product.findByIdAndUpdate(id, data, {
      new: true
    });
  }

  async deleteProduct(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}

export default  ProductService;
