import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { loginResponseAuthDto } from './dto/login-response.dto';
import { RegisterRequestAuthDto } from './dto/register-request-auth.dto';
import { RegisterResponseAuthDto } from './dto/register-response-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Access token to authenticate',
    type: loginResponseAuthDto,
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @ApiCreatedResponse({
    description: 'User created',
    type: RegisterResponseAuthDto,
  })
  @Post('register')
  async register(
    @Body() registerAuthDto: RegisterRequestAuthDto,
  ): Promise<RegisterResponseAuthDto> {
    const user = await this.authService.register(
      registerAuthDto.email,
      registerAuthDto.password,
    );

    return plainToClass(RegisterResponseAuthDto, user);
  }
}
