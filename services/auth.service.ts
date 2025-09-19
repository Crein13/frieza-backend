import prisma from '../prisma/client';
import { hashPassword, comparePassword } from '../utils/crypto';
import redisClient from '../sessions/redisClient';
import { generateTokens, verifyRefreshToken } from '../auth/token.utils';
import { IUserPayload } from '../types/express';

interface IAuthInput {
  email: string;
  password: string;
}

const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');

  const isValid = await comparePassword(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const payload: IUserPayload = { userId: user.id, email: user.email };
  const tokens = generateTokens(payload);

  // Store refresh token in Redis for 7 days
  await redisClient.set(`refresh_${user.id}`, tokens.refreshToken, { EX: 7 * 24 * 60 * 60 });

  return tokens;
};

const register = async ({ email, password }: IAuthInput) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new Error('Email already in use');

  const hashedPassword = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, password: hashedPassword },
  });

  return user;
};

const logout = async (userId: string) => {
  await redisClient.del(`refresh_${userId}`);
  return true;
};

const refreshToken = async (userId: string, token: string) => {
  const storedToken = await redisClient.get(`refresh_${userId}`);
  if (!storedToken || storedToken !== token) throw new Error('Invalid refresh token');

  const payload: IUserPayload = verifyRefreshToken(token);
  const tokens = generateTokens(payload);

  // Update Redis with new refresh token
  await redisClient.set(`refresh_${userId}`, tokens.refreshToken, { EX: 7 * 24 * 60 * 60 });

  return tokens;
};

export default { login, register, logout, refreshToken };
