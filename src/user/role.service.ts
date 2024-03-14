import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './entities/role.entity';
import { AddRoleDto } from './dto/add-role.dto';
import MySqlDataSource from 'src/app-data-source';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { AllRole } from './interfaces/all.role';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepository.save(createRoleDto);
  }

  async add(addRoleDto: AddRoleDto) {
    const role = await this.roleRepository.findOneBy({ id: addRoleDto.roleId });
    if (!role)
      throw new BadRequestException(
        'Role not assignable because doesn\'t exists.',
      );

    const user = await this.userRepository.findOne({
      where: { id: addRoleDto.userId },
      relations: ['role'],
    });

    if (!user) throw new BadRequestException('User not exists.');
    if (user.role instanceof Role)
      throw new BadRequestException(
        'User has already role ' + user.role.roleName,
      );

    user.role = role;
    return await MySqlDataSource.manager.save(user);
  }

  async deleteRole(deleteRoleDto: DeleteRoleDto) {
    const role = await this.roleRepository.findOneBy({ id: deleteRoleDto.id });
    if (!role) throw new BadRequestException('Role doesn\'t exists.');

    const userRoles = await this.userRepository.findBy({ role: role });
    if (userRoles.length !== 0)
      throw new BadRequestException('There are users having this role.');

    return this.roleRepository.delete(role.id);
  }

  async updateRole(userId: number, roleId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user)
      throw new BadRequestException('User ' + userId + " doesn't exists.");

    const role = await this.roleRepository.findOneBy({ id: roleId });
    if (!role)
      throw new BadRequestException('Role ' + roleId + 'doesn\t exists.');

    user.role = role;
    return await MySqlDataSource.manager.save(user);
  }

  async removeRole(userId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new BadRequestException("User doesn't exists");

    user.role = null;
    return await MySqlDataSource.manager.save(user);
  }

  async getAll() {
    const result = await MySqlDataSource.createQueryBuilder()
      .select('role.id, role.roleName, COUNT(user.id) as users_count')
      .from(Role, 'role')
      .leftJoin('role.users', 'user')
      .groupBy('role.roleName')
      .getRawMany();

    const returnResponse = [];
    for (let index = 0; index < result.length; index++) {
      const allRole: AllRole = {
        roleId: result[index].id,
        roleName: result[index].roleName,
        users_count: Number(result[index].users_count),
      };

      returnResponse.push(allRole);
    }

    return returnResponse;
  }
}
