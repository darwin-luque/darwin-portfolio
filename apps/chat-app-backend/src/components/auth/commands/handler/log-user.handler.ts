import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LogUserCommand } from '../impl/log-user.command';

@CommandHandler(LogUserCommand)
export class LogUserHandler implements ICommandHandler<LogUserCommand> {
  async execute(command: LogUserCommand): Promise<void> {
    console.log('Welcome, User created with id: ', command.user.id);
  }
}
