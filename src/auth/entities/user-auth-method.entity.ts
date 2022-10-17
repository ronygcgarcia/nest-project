import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AuthMethod } from './auth-method.entity';
import { User } from './user.entity';

@Entity()
export class UserToAuthMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  two_factor_temp_secret: string;

  @Column({
    nullable: true,
  })
  two_factor_secret: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => AuthMethod)
  auth_method: AuthMethod;
}
