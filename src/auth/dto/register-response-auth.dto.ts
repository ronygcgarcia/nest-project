import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponseAuthDto {
  @ApiProperty()
  public email: string;
}
