import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { User } from '../../infrastructure/entities/user.entity';
import { CommandHandlers } from './commands/handler';
import { AuthController } from './auth.controller';
import { EventHandlers } from './events/handlers';
import { JwtModule } from '@nestjs/jwt';
import { SetUserMiddleware } from '../../infrastructure/middlewares/set-user.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CqrsModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [...CommandHandlers, ...EventHandlers],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SetUserMiddleware).forRoutes('*');
  }
}
