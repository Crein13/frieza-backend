import bcrypt from 'bcrypt';

const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS ? parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) : 10;

export const hashPassword = async (password: string) => bcrypt.hash(password, SALT_ROUNDS);
export const comparePassword = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);
