import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { Token } from '../../../../utils/types';
import { RefreshTokenCommand } from '../impl/refresh-token.command';

@CommandHandler(RefreshTokenCommand)
export class RefreshTokenHandler
  implements ICommandHandler<RefreshTokenCommand>
{
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async execute(command: RefreshTokenCommand): Promise<Token> {
    const payload = await this.jwtService.verifyAsync<User>(
      command.refreshToken,
      { secret: process.env['REFRESH_TOKEN_SECRET'] }
    );
    const user = await this.usersRepository.findOne({
      where: { id: payload.id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${payload.id} not found`);
    }

    const accessToken = await this.jwtService.signAsync(user, {
      expiresIn: '1h',
    });
    const time = new Date().getTime() + 3600000;
    const token: Token = {
      accessToken,
      refreshToken: command.refreshToken,
      expiresIn: new Date(time),
      type: 'Bearer',
    };

    Object.assign(user, { token });
    await this.usersRepository.save(user);

    return token;
  }
}
