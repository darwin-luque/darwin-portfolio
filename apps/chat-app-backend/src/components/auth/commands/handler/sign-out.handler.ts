import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { SignOutCommand } from '../impl/sign-out.command';

@CommandHandler(SignOutCommand)
export class SignOutHandler implements ICommandHandler<SignOutCommand> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async execute(command: SignOutCommand): Promise<void> {
    const user = await this.usersRepository.findOne({
      where: { id: command.userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${command.userId} not found`);
    }

    Object.assign(user, { token: null });

    await this.usersRepository.save(user);
  }
}
