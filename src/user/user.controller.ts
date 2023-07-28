import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { UserAuthData } from './dto/user.auth-data.dto';
import { UserGuard } from './user.guard';

@Controller('user')
@UseGuards(UserGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/register')
  register(@Body() userAuthData: UserAuthData) {
    try {
      return this.userService.registerUser(userAuthData);
    } catch (err) {}
  }
  @Post('/login')
  login(@Body() userAuthData: UserAuthData) {
    return this.userService.loginUser(userAuthData);
  }
}
