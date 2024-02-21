import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstname: string;

  @IsString()
  lastname: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
