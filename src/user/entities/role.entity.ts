import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, unique: true })
  roleName: string;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
