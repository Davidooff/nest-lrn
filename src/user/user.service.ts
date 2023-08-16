import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import { UserAuthData } from './dto/user.auth-data.dto';
import { hashSync, compareSync } from 'bcrypt';
import { JwtService, Tokens } from './jwt/jwt.service';

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
  async loginUser(user: UserAuthData): Promise<Tokens> {
    const userDB = await this.UserModel.findOne({ login: user.login }).lean();
    if (!userDB) throw new Error();
    if (!compareSync(user.password, userDB.password)) throw new Error();
    return this.JWT.generateTokens({
      _id: userDB._id.toString(),
      role: userDB.role,
    });
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    let { _id } = this.JWT.checkRefreshToken(refreshToken);
    const user = await this.UserModel.findOne({ _id }).lean();
    if (!user) throw new Error();
    return this.JWT.generateTokens({
      _id: user._id.toString(),
      role: user.role,
    });
  }

  async updateRole(_id: string, role: number): Promise<void> {
    let data = await this.UserModel.updateOne({ _id }, { role });
    console.log(data);
  }
}
