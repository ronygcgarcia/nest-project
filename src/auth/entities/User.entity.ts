import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Profile } from './Profile.entity';
import { Permission } from './Permission.entity';
import { IsEmail } from 'class-validator';

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

  @ManyToMany(() => Profile)
  @JoinTable()
  profiles: Profile[];

  @ManyToMany(() => Permission)
  @JoinTable()
  permissions: Permission[];
}
