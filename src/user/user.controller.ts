import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserValidationPipe } from './pipes/user.validation.pipes';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CreateUserResponse } from 'src/auth/interfaces/create-user.response';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body(new UserValidationPipe()) createUserDto: CreateUserDto) {
    const result = await this.userService.create(createUserDto);

    const CreateUserResponse: CreateUserResponse = {
      id: result.id,
      username: result.username,
    };
    return CreateUserResponse;
  }

  @UseGuards(JwtGuard)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  update(
    @Param('id') id: string,
    @Body(new UserValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Delete('v2/delete/all')
  removeAll() {
    return this.userService.removeAll();
  }
}
