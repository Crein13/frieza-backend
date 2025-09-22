import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@auth/token.utils';
import { IUserPayload } from '@types/express';
import redisClient from '@/sessions/redisClient';

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // ✅ Verify JWT
    const payload: IUserPayload = verifyAccessToken(token);

    // ✅ Check Redis session to ensure token is still valid
    const session = await redisClient.get(`session:${payload.userId}`);
    if (!session) {
      return res.status(401).json({ message: 'Session expired, please log in again' });
    }

    // Attach payload to request
    req.user = payload;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}
