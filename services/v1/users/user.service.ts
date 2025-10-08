import prisma from '@/prisma/prisma.js';

const service = {
  getAllUsers: async (skip = 0, take = 10) => {
    const users = await prisma.user.findMany({
      skip,
      take,
      // orderBy: { createdAt: 'desc' },
      select: { email: true, name: true },
    });
    return users;
  },
};

export default service;
