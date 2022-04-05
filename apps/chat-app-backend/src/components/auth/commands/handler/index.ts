import { GenerateTokenHandler } from './generate-token.handler';
import { RefreshTokenHandler } from './refresh-token.handler';
import { SignUpHandler } from './sign-up.handler';

export const CommandHandlers = [
  SignUpHandler,
  GenerateTokenHandler,
  RefreshTokenHandler,
];
