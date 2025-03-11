import { Router } from 'express';
import categoryController from '../controllers/category.controller';

const router: Router = Router();

router.get("/api/categories", categoryController.listCategories);

const categoryRoutes = router;
export default categoryRoutes;