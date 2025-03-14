import { Router } from 'express';
import expressWrapper from '../adapters/expressWrapper';
import SignUpController from '../controllers/signup.controller';

const router: Router = Router();

const signUpController =  new SignUpController();
const SignInController = new SignUpController();

router.post('/api/signup',expressWrapper(signUpController.handle));
router.post('/api/signin',expressWrapper(SignInController.handle));


const authRoutes = router;
export default authRoutes;
