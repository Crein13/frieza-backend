import { Router } from 'express';
import userController from '../controllers/user.controller';
import authMiddleware from '../auth/auth.middleware';
const router = Router();

router.get('/me', authMiddleware, userController.getMe);

export const path = '/users';
export { router };
