import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';
import { User } from '../../infrastructure/entities/user.entity';
import { CommandHandlers } from './commands/handler';
import { AuthController } from './auth.controller';
import { EventHandlers } from './events/handlers';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CqrsModule],
  controllers: [AuthController],
  providers: [...CommandHandlers, ...EventHandlers],
})
export class AuthModule {}
