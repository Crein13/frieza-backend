import { Router } from 'express';
import controller from '@/controllers/v1/users/user.controller.js';

import openid from 'express-openid-connect';
const { requiresAuth } = openid;

const router = Router();

router.get('/', requiresAuth(), controller.get);

export const path = '/api/v1/users';
export { router };
