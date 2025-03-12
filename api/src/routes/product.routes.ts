import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import InventoryService from '../services/inventory.service';
import ProductService from '../services/product.service';
import { IInventoryService, IProductService } from '../types';

const router: Router = Router();
const productService: IProductService = new ProductService();
const inventoryService: IInventoryService = new InventoryService();
const controller: ProductController = new ProductController(productService, inventoryService);


router.post("/api/product", controller.create);
router.get("/api/products", controller.read);
router.get("/api/product/:id", controller.readById);
router.put("/api/product/:id", controller.update);
router.delete("/api/product/:id", controller.delete);

const productRoutes = router;
export default productRoutes;
