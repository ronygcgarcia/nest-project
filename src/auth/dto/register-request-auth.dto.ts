import { ApiProperty } from '@nestjs/swagger';
import { IsUnique } from '@youba/nestjs-dbvalidator';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Match } from '../decorators/Match.decorator';

export class RegisterRequestAuthDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, [{ table: '"user"', column: 'email' }])
  @ApiProperty()
  public email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  @ApiProperty()
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', {
    message: 'Password does not match',
  })
  @ApiProperty()
  password_confirm: string;
}
