import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { TokenPayloadDto } from '../../components/auth/dtos/token-payload.dto';
import { CustomRequest } from '../../utils/types';
import moment = require('moment');

@Injectable()
export class SetUserMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async use(req: CustomRequest, _res: never, next: NextFunction) {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      console.log(token);

      if (token) {
        const { id } = await this.jwtService.verifyAsync<TokenPayloadDto>(
          token
        );

        let foundUser = await this.usersRepository.findOne({ where: { id } });

        if (
          foundUser?.token?.accessToken !== token &&
          moment(foundUser?.token?.expiresAt).isBefore()
        ) {
          foundUser = null;
        }
        req.user = foundUser ?? undefined;
      }
    } catch {
      req.user = undefined;
    }

    next();
  }
}
