import { Request } from 'express';

export interface IUserPayload {
  userId: string;
  email?: string;
  role?: string;
}

// Extend Express Request object
declare module 'express-serve-static-core' {
  interface Request {
    user?: IUserPayload;
  }
}
