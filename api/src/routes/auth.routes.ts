import { Router } from 'express';
import expressWrapper from '../adapters/expressWrapper';
import SignInController from '../controllers/signin.controller';
import SignUpController from '../controllers/signup.controller';

const router: Router = Router();

const signUpController =  new SignUpController();
const signInController = new SignInController();

router.post('/api/signup',expressWrapper(signUpController.handle));
router.post('/api/signin',expressWrapper(signInController.handle));


const authRoutes = router;
export default authRoutes;
