import { Module } from '@nestjs/common';
import { AuthMethodsService } from './auth-methods.service';
import { AuthMethodsController } from './auth-methods.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthMethod } from '../auth/entities/auth-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AuthMethod])],
  controllers: [AuthMethodsController],
  providers: [AuthMethodsService],
})
export class AuthMethodsModule {}
