import { Schema, model } from 'mongoose';
import { ICategory } from '../types';

const CategorySchema : Schema = new Schema<ICategory>({
  name: String,
  description: String,
  imageUrl: String
}, {
  timestamps: true
});

const CategoryModel = model<ICategory>("Category", CategorySchema);

export default  CategoryModel;  