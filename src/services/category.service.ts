import Category from '../models/category';
import { ICategory } from '../types';


async function listCategories(): Promise<ICategory[]> {
  return await Category.find().exec();
}

async function createCategory(category: ICategory):Promise<ICategory>{
  return await Category.create(category);
}

export default {
  createCategory, listCategories
};
