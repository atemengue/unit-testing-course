import { Document, Types } from 'mongoose';
import { CheckInterface, IResult } from '../services/inventory.service';

export interface ICategory {
  name: string;
  description: string;
  imageUrl: string;
}

export interface IProduct {
  id: Types.ObjectId,
  name: string,
  description?: string,
  price: number,
  stock: number,
  imageUrl: string,
  categoryId: Types.ObjectId,
}

export interface IBasket extends Document {
  userId?: Types.ObjectId,
  products: IProduct[];
  subTotal: number;
  taxes: number;
  deliveryFees: number;
  total: number;
  appliedPromoCode?: string;
  discount?: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

export interface IOrder {
  userId: Types.ObjectId;
  status: string;
  productId: IProduct
  shippingAddress: string;
  quantity: number;
  orderDate: Date;
}

export enum OrderStatus {
  Created = 'created',
  Cancelled = 'cancelled',
  AwaitingPayment = 'awaiting:payment',
  Completed = 'completed'
}

export interface IInventory {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IProductService {
  createProduct(product: IProduct): Promise<IProduct>;
  getById(id: string): Promise<IProduct | null>;
  lists(): Promise<IProduct[]>;
  updateProduct(id: string, data: IProduct): Promise<IProduct | null>;
  deleteProduct(id: string): Promise<IProduct | null>;
}

export interface IInventoryService {
  checkInventory(id: string): Promise<CheckInterface| undefined >
  createInventory(inventory: IInventory): Promise<IResult>
  updateInventory(id: string, quantity: number): Promise<IResult>
}