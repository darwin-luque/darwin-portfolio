import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './components/auth/auth.module';

const configs = {
  synchronize: process.env.NODE_ENV === 'development',
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};

@Module({
  imports: [AuthModule, TypeOrmModule.forRoot(configs)],
  controllers: [],
  providers: [],
})
export class AppModule {}
