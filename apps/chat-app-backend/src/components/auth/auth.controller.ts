import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Serialize } from '../../infrastructure/decorators/serialize.decorator';
import { User } from '../../infrastructure/entities/user.entity';
import { GenerateTokenCommand } from './commands/impl/generate-token.command';
import { SignUpCommand } from './commands/impl/sign-up.command';
import { SignUpDto } from './dtos/sign-up.dto';
import { SignUpResponseDto } from './dtos/sign-up.response.dto';

interface UserAndToken {
  user: User;
  token: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Post('sign-up')
  @Serialize(SignUpResponseDto)
  async signup(@Body() body: SignUpDto): Promise<UserAndToken> {
    const user = await this.commandBus.execute(
      new SignUpCommand(body.email, body.password, body.username)
    );
    const token = await this.commandBus.execute(new GenerateTokenCommand(user));

    return { user, token };
  }
}
