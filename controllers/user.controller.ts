import { Request, Response } from 'express';

const getMe = async (req: Request, res: Response) => {
  res.json({ userId: req.user?.userId, message: 'Current user info' });
};

export default { getMe };
