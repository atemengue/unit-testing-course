import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import ProductService from '../services/product.service';
import { IProductService } from '../types';

const router: Router = Router();
const productService: IProductService = new ProductService();
const controller: ProductController = new ProductController(productService);


router.post("/api/product", controller.create);
router.get("/api/products", controller.read);
router.get("/api/product/:id", controller.readById);
router.put("/api/product/:id", controller.update);
router.delete("/api/product/:id", controller.delete);

const productRoutes = router;
export default productRoutes;
