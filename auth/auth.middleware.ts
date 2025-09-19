import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from './token.utils';
import { IUserPayload } from '../types/express.d';

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const payload: IUserPayload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
}
