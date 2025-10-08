import { Router } from 'express';
import controller from '@/controllers/v1/users/user.controller.js';

const router = Router();

router.get('/', controller.get);

export const path = '/users';
export { router };
