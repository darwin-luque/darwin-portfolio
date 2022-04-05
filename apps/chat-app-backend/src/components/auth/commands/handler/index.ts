import { GenerateTokenHandler } from './generate-token.handler';
import { RefreshTokenHandler } from './refresh-token.handler';
import { SignOutHandler } from './sign-out.handler';
import { SignUpHandler } from './sign-up.handler';

export const CommandHandlers = [
  GenerateTokenHandler,
  RefreshTokenHandler,
  SignOutHandler,
  SignUpHandler,
];
