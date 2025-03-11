import { Schema, model } from 'mongoose';

interface ICategory {
  name: string;
  description: string;
  imageUrl: string;
}

const CategorySchema : Schema = new Schema<ICategory>({
  name: String,
  description: String,
  imageUrl: String
}, {
  timestamps: true
});

const CategoryModel = model<ICategory>("Category", CategorySchema);

export default  CategoryModel;