import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CurrentUser } from '../../infrastructure/decorators/current-user.decorator';
import { Serialize } from '../../infrastructure/decorators/serialize.decorator';
import { AuthGuard } from '../../infrastructure/guards/auth.guard';
import { User } from '../../infrastructure/entities/user.entity';
import { GenerateTokenCommand } from './commands/impl/generate-token.command';
import { SignUpCommand } from './commands/impl/sign-up.command';
import { SignInQuery } from './queries/impl/sign-in.query';
import { UserAndTokenDto } from './dtos/user-and-token';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { UserDto } from './dtos/user.dto';
import { Token } from '../../utils/types';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { TokenDto } from './dtos/token.dto';
import { RefreshTokenCommand } from './commands/impl/refresh-token.command';

interface UserAndToken {
  user: User;
  token: Token;
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
    const user = await this.commandBus.execute<SignUpCommand, User>(
      new SignUpCommand(body.email, body.password, body.username)
    );
    const token = await this.commandBus.execute<GenerateTokenCommand, Token>(
      new GenerateTokenCommand(user)
    );

    return { user, token };
  }

  @Post('sign-in')
  @Serialize(UserAndTokenDto)
  async signin(@Body() body: SignInDto): Promise<UserAndToken> {
    const user = await this.queryBus.execute<SignInQuery, User>(
      new SignInQuery(body.email, body.password)
    );
    const token = await this.commandBus.execute<GenerateTokenCommand, Token>(
      new GenerateTokenCommand(user)
    );

    return { user, token };
  }

  @Post('refresh-token')
  @Serialize(TokenDto)
  refreshToken(@Body() body: RefreshTokenDto): Promise<Token> {
    return this.commandBus.execute<RefreshTokenCommand, Token>(
      new RefreshTokenCommand(body.refreshToken)
    );
  }

  @Get('me')
  @Serialize(UserDto)
  @UseGuards(AuthGuard)
  me(@CurrentUser() user: User): User {
    return user;
  }
}
