import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Permission } from './permission.entity';
import { IsEmail } from 'class-validator';
import { UserToAuthMethod } from './user-auth-method.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column()
  active: boolean;

  @Column({
    nullable: true,
  })
  two_factor_auth_enable: boolean;

  @ManyToMany(() => Profile)
  @JoinTable()
  profiles: Profile[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(
    () => UserToAuthMethod,
    (userToAuthMethod) => userToAuthMethod.user,
  )
  user_auth_methods: UserToAuthMethod[];
}
