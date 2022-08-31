import { IsUnique } from '@youba/nestjs-dbvalidator';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { Match } from './Match.decorator';

export class RegisterAuthDto {
  @IsString()
  @IsNotEmpty()
  @Validate(IsUnique, [{ table: '"user"', column: 'email' }])
  public email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', {
    message: 'Password does not match',
  })
  password_confirm: string;
}
