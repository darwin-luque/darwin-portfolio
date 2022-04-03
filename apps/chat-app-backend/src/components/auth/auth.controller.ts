import { Body, Controller, Get, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';
import { Serialize } from '../../infrastructure/decorators/serialize.decorator';
import { User } from '../../infrastructure/entities/user.entity';
import { GenerateTokenCommand } from './commands/impl/generate-token.command';
import { SignUpCommand } from './commands/impl/sign-up.command';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { UserAndTokenDto } from './dtos/user-and-token';
import { UserDto } from './dtos/user.dto';
import { SignInQuery } from './queries/impl/sign-in.query';

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
  @Serialize(UserAndTokenDto)
  async signup(@Body() body: SignUpDto): Promise<UserAndToken> {
    const user = await this.commandBus.execute(
      new SignUpCommand(body.email, body.password, body.username)
    );
    const token = await this.commandBus.execute(new GenerateTokenCommand(user));

    return { user, token };
  }

  @Post('sign-in')
  @Serialize(UserAndTokenDto)
  async signin(@Body() body: SignInDto): Promise<UserAndToken> {
    const user = await this.queryBus.execute<SignInQuery, User>(
      new SignInQuery(body.email, body.password)
    );
    const token = await this.commandBus.execute<GenerateTokenCommand, string>(
      new GenerateTokenCommand(user)
    );

    return { user, token };
  }

  @Get('me')
  @Serialize(UserDto)
  me(@CurrentUser() user: User): User {
    return user;
  }
}
