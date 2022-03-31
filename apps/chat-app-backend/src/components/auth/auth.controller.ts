import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from '../../infrastructure/entities/user.entity';
import { SignUpCommand } from './commands/impl/sign-up.command';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post('sign-up')
  signup(@Body() body: SignUpDto): Promise<User> {
    return this.commandBus.execute(
      new SignUpCommand(body.email, body.password, body.username)
    );
  }
}
