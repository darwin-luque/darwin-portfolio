import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CustomRequest } from '../../utils/types';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest() as CustomRequest;
    return !!request.user && !!request.user.token;
  }
}
