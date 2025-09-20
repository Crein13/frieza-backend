import prisma from '../prisma/client';
import redisClient from '../sessions/redisClient';
import { generateTokens, verifyRefreshToken } from '../auth/token.utils';
import { IUserPayload } from '../types/express';
import { hashPassword, comparePassword } from '../utils/crypto';

class AuthService {
  async register(name: string, email: string, password: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) throw new Error('Email already exists');

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const payload: IUserPayload = { userId: user.id, email: user.email };
    const tokens = generateTokens(payload);

    await redisClient.set(`refresh:${tokens.refreshToken}`, String(user.id), {
      EX: 7 * 24 * 60 * 60,
    });

    return { user, ...tokens };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw new Error('Invalid credentials');

    const payload: IUserPayload = { userId: user.id, email: user.email };
    const tokens = generateTokens(payload);

    await redisClient.set(`refresh:${tokens.refreshToken}`, String(user.id), {
      EX: 7 * 24 * 60 * 60,
    });

    return { user, ...tokens };
  }

  async refreshToken(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);

    const stored = await redisClient.get(`refresh:${refreshToken}`);
    if (!stored) throw new Error('Invalid or expired refresh token');

    const newTokens = generateTokens({ userId: payload.userId, email: payload.email });

    await redisClient.del(`refresh:${refreshToken}`);
    await redisClient.set(`refresh:${newTokens.refreshToken}`, String(payload.userId), {
      EX: 7 * 24 * 60 * 60,
    });

    return newTokens;
  }

  async logout(refreshToken: string) {
    await redisClient.del(`refresh:${refreshToken}`);
    return { message: 'Logout successful' };
  }
}

export default new AuthService();
