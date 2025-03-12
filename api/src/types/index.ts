import { Document, Types } from 'mongoose';
export interface ICategory {
  name: string;
  description: string;
  imageUrl: string;
}

export interface IProduct extends Document {
  name: string,
  description?: string,
  price: number,
  stock: number,
  imageUrl: number,
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

export interface IOrder extends Document {
  userId: Types.ObjectId;
  status: string;
  products: IProduct[]
  shippingAddress: string;
  total: number;
  orderDate: Date;
}

export enum OrderStatus {
  Created = 'created',
  Cancelled = 'cancelled',
  AwaitingPayment = 'awaiting:payment',
  Completed = 'completed'
}

export interface IInventory extends Document {
  quantity: number;
  productId: Types.ObjectId
}

export interface IProductService {
  createProduct(product: IProduct): Promise<IProduct>;
  readProductById(id: string): Promise<IProduct | null>;
  readAllProduct(): Promise<IProduct[]>;
  updateProduct(id: string, data: IProduct): Promise<IProduct | null>;
  deleteProduct(id: string): Promise<IProduct | null>;
}