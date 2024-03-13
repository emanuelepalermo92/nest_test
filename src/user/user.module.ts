import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
})
export class UserModule {}
