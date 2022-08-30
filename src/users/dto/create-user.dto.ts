import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public email;

  @IsString()
  @IsNotEmpty()
  public password;

  @IsBoolean()
  @IsNotEmpty()
  public active;
}
