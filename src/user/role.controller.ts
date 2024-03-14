import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Patch,
  Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserValidationPipe } from './pipes/user.validation.pipes';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleService } from './role.service';
import { AddRoleDto } from './dto/add-role.dto';

@Controller('role')
export class RoleController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Post('create')
  create(@Body(new UserValidationPipe()) createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Post('add')
  addRole(@Body(new UserValidationPipe()) addRoleDto: AddRoleDto) {
    return this.roleService.add(addRoleDto);
  }

  @Delete('/delete/:id')
  deleteRole(@Param('id') id: string) {
    return this.roleService.deleteRole({ id: Number(id) });
  }

  @Patch('/:roleId/update/:userId')
  updateRole(@Param('userId') userId: string, @Param('roleId') roleId: string) {
    return this.roleService.updateRole(Number(userId), Number(roleId));
  }

  @Post('/remove-from-user/:userId')
  removeRole(@Param('userId') userId: string) {
    return this.roleService.removeRole(Number(userId));
  }

  @Get('all')
  getAll() {
    return this.roleService.getAll();
  }

  @Delete('v2/delete/all')
  removeAll() {
    return this.roleService.removeAll();
  }
}
