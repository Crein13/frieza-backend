import prisma from '@prisma/client';
import { hashPassword } from '@utils/crypto';

interface IUserUpdate {
  email?: string;
  password?: string;
}

const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');
  return user;
};

const getAllUsers = async (skip = 0, take = 10) => {
  const users = await prisma.user.findMany({
    skip,
    take,
    orderBy: { createdAt: 'desc' },
    select: { id: true, email: true, createdAt: true },
  });
  return users;
};

const updateUser = async (id: string, data: IUserUpdate) => {
  const updateData: any = { ...data };

  if (data.password) {
    updateData.password = await hashPassword(data.password);
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
  });

  return user;
};

const deleteUser = async (id: string) => {
  await prisma.user.delete({ where: { id } });
  return true;
};

export default { getUserById, getAllUsers, updateUser, deleteUser };
