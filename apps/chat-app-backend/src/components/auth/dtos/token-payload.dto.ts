import { Expose } from 'class-transformer';

export class TokenPayloadDto {
  @Expose()
  email: string;

  @Expose()
  id: string;

  @Expose()
  username: string;
}
