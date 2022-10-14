import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from './entities/User.entity';
import { compare, hash } from 'bcrypt';
import IUserPayload from './interfaces/IUserPayload';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const plainToHash = await hash(password, 10);
    return await this.usersService.create(email, plainToHash);
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !(await compare(password, user.password)))
      throw new UnauthorizedException();

    return user;
  }

  async login(user: IUserPayload): Promise<{ access_token: string }> {
    const permissions = user.profiles.flatMap((profile) =>
      profile.permissions.map((permission) => permission.name),
    );
    const payload = { email: user.email, sub: user.id, permissions };

    return { access_token: this.jwtService.sign(payload) };
  }
}
