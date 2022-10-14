import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
      relations: ['profiles.permissions'],
      relationLoadStrategy: 'join',
    });
  }

  create(email: string, password: string): Promise<User> {
    return this.usersRepository.save({
      email,
      password,
      active: true,
    });
  }
}
