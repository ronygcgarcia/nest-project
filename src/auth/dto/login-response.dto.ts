import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class loginResponseAuthDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public access_token: string;
}
