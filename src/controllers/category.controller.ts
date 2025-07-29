/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *     CategoryInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       required:
 *         - name
 */


import { Request, Response } from 'express';
import categoryService from '../services/category.service';

 export const listCategories = async (_req: Request, res: Response)=> {
  try {
    const categories = await categoryService.listCategories();
    if (categories.length === 0) {
       res.status(204).send(categories);
    } else {
      res.status(200).send(categories);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

export const createCategory = async(req: Request, res: Response) =>{
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).send(category);
  } catch (error) {
    res.status(500).send(error)
  }
}
