import { BadRequestException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../infrastructure/entities/user.entity';
import { SignInQuery } from '../impl/sign-in.query';

@QueryHandler(SignInQuery)
export class SignInHandler implements IQueryHandler<SignInQuery> {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async execute(query: SignInQuery): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: query.email },
    });

    if (!user) {
      throw new BadRequestException(
        `User with email ${query.email} doesn't exist`
      );
    }

    if (!(await user.comparePassword(query.password))) {
      throw new BadRequestException('Invalid password');
    }

    return user;
  }
}
