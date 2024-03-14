import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 20 })
  username: string;

  @Column()
  password: string;

  @Column()
  last_access: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role | null;
}
