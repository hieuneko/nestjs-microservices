import { UserDto } from 'apps/auth/src/dtos/user.dto';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  toDto(): UserDto {
    const userDto = new UserDto();

    userDto.id = this.id;
    userDto.name = this.name;
    userDto.email = this.email;

    return userDto;
  }
}
