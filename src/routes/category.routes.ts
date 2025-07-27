import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';

const router: Router = Router();

router.get("/api/categories", categoryController.listCategories);
router.post("/api/category", categoryController.createCategory)

const categoryRoutes = router;
export default categoryRoutes;