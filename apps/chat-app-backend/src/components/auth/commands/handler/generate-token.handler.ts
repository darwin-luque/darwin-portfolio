import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from '../../dtos/token-payload.dto';
import { GenerateTokenCommand } from '../impl/generate-token.command';
import { Token } from '../../../../utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { Repository } from 'typeorm';

// TODO: Apply refresh token strategy
@CommandHandler(GenerateTokenCommand)
export class GenerateTokenHandler
  implements ICommandHandler<GenerateTokenCommand>
{
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async execute(command: GenerateTokenCommand): Promise<Token> {
    const payload = plainToClass(TokenPayloadDto, command.user, {
      excludeExtraneousValues: true,
    });
    const accessToken = await this.jwtService.signAsync(
      { ...payload },
      { expiresIn: '1h' }
    );
    const refreshToken = await this.jwtService.signAsync(
      { ...payload },
      { secret: process.env['REFRESH_TOKEN_SECRET'] }
    );

    const time = new Date().getTime() + 3600000;
    const token: Token = {
      accessToken,
      refreshToken,
      expiresIn: new Date(time),
      type: 'Bearer',
    };

    Object.assign(command.user, { token });
    await this.usersRepository.save(command.user);

    return token;
  }
}
