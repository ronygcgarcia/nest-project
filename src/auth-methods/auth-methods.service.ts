import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthMethod } from '../auth/entities/auth-method.entity';

@Injectable()
export class AuthMethodsService {
  constructor(
    @InjectRepository(AuthMethod)
    private authMethodRepository: Repository<AuthMethod>,
  ) {}
  findAll() {
    return this.authMethodRepository.find();
  }
}
