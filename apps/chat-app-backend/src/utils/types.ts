import type { Request } from 'express';
import { User } from '../infrastructure/entities/user.entity';

export interface CustomRequest extends Request {
  user?: User;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
  type: 'Bearer';
}
