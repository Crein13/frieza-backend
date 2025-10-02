import promiseController from "../utils/index.js";
import type { Request, Response } from 'express';
import service from '@/services/v1/users/user.service.js';

const controller = {
  get: promiseController(async (req: Request, res: Response) => {
    const users = await service.getAllUsers();
    return users;
  }),
};

export default controller;
