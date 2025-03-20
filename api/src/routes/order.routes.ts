import { Router } from 'express';
import controllerOrder from '../controllers/order.controller';

const router: Router = Router();

router.post('/api/order', controllerOrder.createOrder);
router.get('/api/order/:id', controllerOrder.getOrder);

