import Category from '../models/category';
import { ICategory } from '../types';


async function listCategories(): Promise<ICategory[]> {
  return await Category.find();
}

export default {
  listCategories
}