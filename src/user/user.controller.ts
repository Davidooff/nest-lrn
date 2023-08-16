import { Body, Controller, Get, Post, UseGuards, Put } from '@nestjs/common';
import { UserService } from './user.service';
import {
  RefreshData,
  UpdateRole,
  UserAuthData,
} from './dto/user.auth-data.dto';
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
  @Post('/refresh')
  refresh(@Body() data: RefreshData) {
    return this.userService.refreshTokens(data.refreshToken);
  }

  @Put('/role')
  changeRole(@Body() updateRole: UpdateRole) {
    const { _id, role } = updateRole;
    this.userService.updateRole(_id, role);
    return;
  }
}
