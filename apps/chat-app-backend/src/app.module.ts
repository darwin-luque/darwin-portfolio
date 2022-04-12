import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './components/auth/auth.module';
import { Message } from './infrastructure/entities/message.entity';
import { User } from './infrastructure/entities/user.entity';
import { Chat } from './infrastructure/entities/chat.entity';
import { ChatModule } from './components/chat/chat.module';

const configs: TypeOrmModuleOptions = {
  synchronize: process.env.NODE_ENV === 'development',
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DB_NAME,
  entities: [User, Chat, Message],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(configs),
    TypeOrmModule.forFeature([User]),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ChatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
