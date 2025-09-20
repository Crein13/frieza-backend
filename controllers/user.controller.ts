import { Request, Response } from 'express';
import userService from '../services/user.service';

export const getMe = async (req: Request, res: Response) => {
  try {
    // @ts-ignore: added by auth middleware
    const userId = req.user?.id;
    const user = await userService.getUserById(userId);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'User not found' });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Failed to fetch users' });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await userService.updateUser(id, req.body);
    res.json({ message: 'User updated successfully', user: updated });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Update failed' });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Delete failed' });
  }
};
