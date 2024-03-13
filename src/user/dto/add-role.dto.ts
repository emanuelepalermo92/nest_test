import { IsInt } from 'class-validator';

export class AddRoleDto {
  @IsInt()
  userId: number;

  @IsInt()
  roleId: number;
}
