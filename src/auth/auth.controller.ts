import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
