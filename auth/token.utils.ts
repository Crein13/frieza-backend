import jwt from 'jsonwebtoken';
import { IUserPayload } from '../types/express';

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'access_secret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh_secret';

export const generateTokens = (payload: IUserPayload) => ({
  accessToken: jwt.sign(payload, ACCESS_SECRET, { expiresIn: '15m' }),
  refreshToken: jwt.sign(payload, REFRESH_SECRET, { expiresIn: '7d' }),
});

export const verifyAccessToken = (token: string): IUserPayload =>
  jwt.verify(token, ACCESS_SECRET) as IUserPayload;

export const verifyRefreshToken = (token: string): IUserPayload =>
  jwt.verify(token, REFRESH_SECRET) as IUserPayload;
