import type { Request } from 'express';
import { User } from '../infrastructure/entities/user.entity';

export interface CustomRequest extends Request {
  user?: User;
}
