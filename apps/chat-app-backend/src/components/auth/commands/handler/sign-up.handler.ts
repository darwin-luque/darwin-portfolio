import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { User } from '../../../../infrastructure/entities/user.entity';
import { SignUpCommand } from '../impl/sign-up.command';

@CommandHandler(SignUpCommand)
export class SignUpHandler implements ICommandHandler<SignUpCommand> {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly publisher: EventPublisher
  ) {}

  async execute(command: SignUpCommand): Promise<User> {
    const { email, password, username } = command;

    const hashedPassword = await hash(password, 12);

    const userInstance = this.userRepository.create({
      email,
      password: hashedPassword,
      username,
    });

    const user = this.publisher.mergeObjectContext(
      await this.userRepository.save(userInstance)
    );
    user.commit();

    return user;
  }
}
