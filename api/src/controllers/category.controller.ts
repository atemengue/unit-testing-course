
import { Request, RequestHandler, Response } from 'express';
import categoryService from '../services/category.service';

 const listCategories: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await categoryService.listCategories();
    if (categories.length === 0) {
      res.status(204).send(categories);
    }
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send(error);
  }
}

export default {
  listCategories
}