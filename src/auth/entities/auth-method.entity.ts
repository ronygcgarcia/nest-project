import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserToAuthMethod } from './user-auth-method.entity';

@Entity()
export class AuthMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => UserToAuthMethod,
    (userToAuthMethod) => userToAuthMethod.auth_method,
  )
  user_auth_methods: UserToAuthMethod[];
}
