import {Router} from 'express';
import { AuthController } from './controllers/AuthController';
import { UserController } from './controllers/UserController';
import authMiddleware from './middlewares/authMiddleware';
const userController = new UserController;
const authController = new AuthController
const router = Router();

router.post('/users', userController.create);
router.post('/auth',authController.authenticate);
router.get('/users', authMiddleware,userController.index);

export {router};
