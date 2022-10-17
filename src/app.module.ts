import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppDataSource } from '../ormconfig';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import {
  DbConnectOptions,
  DbValidatorsModule,
} from '@youba/nestjs-dbvalidator';
import { ProfileModule } from './profile/profile.module';
import { PermissionModule } from './permission/permission.module';
import { AuthMethodsModule } from './auth-methods/auth-methods.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(AppDataSource.options),
    DbValidatorsModule.register(AppDataSource.options as DbConnectOptions),
    AuthModule,
    UsersModule,
    ProfileModule,
    PermissionModule,
    AuthMethodsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
