import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginResponse } from './interfaces/login.response';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    //TODO: add relation
    const user = await this.userService.findOneByUsername(username);
    if (!user) return null;

    const result = await bcrypt.compare(password, user.password);
    if (!result) return null;

    const JwtPayload: JwtPayload = {
      id: user.id,
      username: user.username,
    };

    this.userService.updateLastAccess(user.id);

    const LoginResponse: LoginResponse = {
      userId: user.id,
      username: user.username,
      role: user.role?.roleName,
      token: this.jwtService.sign(JwtPayload),
    };

    return LoginResponse;
  }
}
