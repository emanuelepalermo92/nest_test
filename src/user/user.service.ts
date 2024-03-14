import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import MySqlDataSource from 'src/app-data-source';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const cryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = cryptedPassword;

    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      return [];
    }

    return users.map((user) => ({
      ['id']: user.id,
      ['username']: user.username,
    }));
  }

  async findOne(id: number) {
    const user = await this.userRepository.findBy({ id });
    const mappedUser = user.map((user) => ({
      ['id']: user.id,
      ['username']: user.username,
      ['last_access']: user.last_access,
    }));

    return mappedUser.pop() ?? [];
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
    updateUserDto.password = hashedPassword;

    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username: username },
      relations: ['role'],
    });
  }

  updateLastAccess(userId: number) {
    return this.userRepository.update(userId, {
      last_access: Math.floor(Date.now() / 1000),
    });
  }

  async removeAll() {
    return await MySqlDataSource.createQueryBuilder()
      .delete()
      .from(User)
      .execute();
  }
}
