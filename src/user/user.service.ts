import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { UserAuthData } from './dto/user.auth-data.dto';
import { hashSync, compareSync } from 'bcrypt';
import {
  JwtService,
  AccessTokenData,
  RefreshTokenData,
} from './jwt/jwt.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private UserModel: mongoose.Model<User>,
    private JWT: JwtService,
  ) {}
  async registerUser(user: UserAuthData): Promise<User> {
    if (await this.UserModel.findOne(user)) {
      throw new Error(`User ${user.login} already registered`);
    }
    user.password = await hashSync(user.password, 10);
    const newUser = await this.UserModel.create(user);
    delete newUser.password;
    return newUser;
  }
  async loginUser(
    user: UserAuthData,
  ): Promise<{ accessToke: string; refreshToken: string }> {
    const userDB = await this.UserModel.findOne({ login: user.login }).lean();
    if (!userDB) throw new Error();
    if (!compareSync(user.password, userDB.password)) throw new Error();
    return this.JWT.generateTokens({
      _id: userDB._id.toString(),
      role: userDB.role,
    });
  }
}
