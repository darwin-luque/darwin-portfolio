import { User } from '../../../../infrastructure/entities/user.entity';

export class LogUserCommand {
  constructor(public readonly user: User) {}
}
