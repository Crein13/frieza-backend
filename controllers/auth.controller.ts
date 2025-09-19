import { Request, Response } from 'express';
import authService from '../services/auth.service';

const login = async (req: Request, res: Response) => {
  try {
    const tokens = await authService.login(req.body.email, req.body.password);
    res.json(tokens);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    await authService.logout(req.user!.userId);
    res.json({ message: 'Logged out successfully' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(req.user!.userId, refreshToken);
    res.json(tokens);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export default { login, register, logout, refreshToken };
