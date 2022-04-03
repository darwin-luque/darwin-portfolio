import { User } from '../entities/user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext): User => {
    return context.switchToHttp().getRequest().user;
  }
);
