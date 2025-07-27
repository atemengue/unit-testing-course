import { Schema, model } from 'mongoose';
import { IProduct } from '../types';

const ProductSchema: Schema = new Schema<IProduct>({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  imageUrl: String,
  categoryId: {
    type: Schema.Types.ObjectId, ref: "Category",
    required: true
  }
}, {
  timestamps: true
})

const ProductModel = model<IProduct>("Product", ProductSchema);

export default ProductModel;