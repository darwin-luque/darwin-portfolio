import { User } from '../../../../infrastructure/entities/user.entity';

export class GenerateTokenCommand {
  constructor(public user: User) {}
}
