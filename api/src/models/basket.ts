import { Schema, model } from 'mongoose';
import { IBasket } from '../types';

const BasketSchema: Schema = new Schema<IBasket>({
  userId: { type: String },
  products: { type: [Schema.Types.ObjectId], required: true, ref: 'Product'},
  subTotal: { type: Number, required: true },
  taxes: { type: Number, required: true },
  deliveryFees: { type: Number, required: true },
  total: { type: Number, required: true },
  appliedPromoCode: { type: String },
  discount: { type: Number },
});

const Basket = model<IBasket>('Basket', BasketSchema);

export default Basket;
