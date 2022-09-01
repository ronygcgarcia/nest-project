import { PartialType } from '@nestjs/mapped-types';
import { LoginRequestAuthDto } from './login-request.dto';

export class UpdateAuthDto extends PartialType(LoginRequestAuthDto) {}
