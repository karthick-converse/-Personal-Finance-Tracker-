import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  full_name: string;

  @Column({
    type: 'timestamp',
    default: new Date(),
  })
  created_at: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  updated_at: Date;

  @BeforeInsert()
  async bycrpyfu() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
