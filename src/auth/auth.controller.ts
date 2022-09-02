import { Controller, Post, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { AuthService } from './auth.service';
import { LoginRequestAuthDto } from './dto/login-request.dto';
import { loginResponseAuthDto } from './dto/login-response.dto';
import { RegisterRequestAuthDto } from './dto/register-request-auth.dto';
import { RegisterResponseAuthDto } from './dto/register-response-auth.dto';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description: 'Access token to authenticate',
    type: loginResponseAuthDto,
  })
  @Post('login')
  async login(
    @Body() loginAuthDto: LoginRequestAuthDto,
  ): Promise<loginResponseAuthDto> {
    const user = await this.authService.validateUser(
      loginAuthDto.email,
      loginAuthDto.password,
    );
    const token = await this.authService.login({
      email: user.email,
      id: user.id,
    });
    return plainToClass(loginResponseAuthDto, token);
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
