import { IsInt } from 'class-validator';

export class DeleteRoleDto {
  @IsInt()
  id: number;
}
