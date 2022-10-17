import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthMethodsService } from './auth-methods.service';

@ApiTags('Auth methods')
@Controller('auth/methods')
export class AuthMethodsController {
  constructor(private readonly authMethodsService: AuthMethodsService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.authMethodsService.findAll();
  }
}
