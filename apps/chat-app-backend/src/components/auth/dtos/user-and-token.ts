import { Expose, Type } from 'class-transformer';
import { TokenDto } from './token.dto';
import { UserDto } from './user.dto';

export class UserAndTokenDto {
  @Type(() => UserDto)
  @Expose()
  user: UserDto;

  @Type(() => TokenDto)
  @Expose()
  token: TokenDto;
}
