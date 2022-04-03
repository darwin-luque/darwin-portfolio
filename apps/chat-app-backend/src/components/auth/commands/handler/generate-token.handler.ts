import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';
import { TokenPayloadDto } from '../../dtos/token-payload.dto';
import { GenerateTokenCommand } from '../impl/generate-token.command';

@CommandHandler(GenerateTokenCommand)
export class GenerateTokenHandler
  implements ICommandHandler<GenerateTokenCommand>
{
  constructor(private jwtService: JwtService) {}

  execute(command: GenerateTokenCommand): Promise<string> {
    const payload = plainToClass(TokenPayloadDto, command.user, {
      excludeExtraneousValues: true,
    });
    return this.jwtService.signAsync({ ...payload });
  }
}
