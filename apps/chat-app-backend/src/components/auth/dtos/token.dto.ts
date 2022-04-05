import { Expose } from 'class-transformer';

export class TokenDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  expiresIn: Date;

  @Expose()
  type: string;
}
