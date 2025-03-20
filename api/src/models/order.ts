import { Schema, model } from 'mongoose';
import { IOrder, OrderStatus } from '../types';


const OrderSchema: Schema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: "User"},
  status: {type: String , require: Object.values(OrderStatus) },
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product'},
  shippingAddress: { type: String, required: true },
  quantity: Number,
  orderDate: Date

})

const OrderModel = model<IOrder>('Order', OrderSchema);

export default OrderModel