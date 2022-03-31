import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { User } from '../../infrastructure/entities/user.entity';
import { CommandHandlers } from './commands/handler';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [...CommandHandlers],
})
export class AuthModule {}
