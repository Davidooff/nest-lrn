import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AccessTokenData {
  _id: string;
  role: number;
}

export interface RefreshTokenData {
  _id: string;
  role: number;
}

interface GenerateTokensArgs extends RefreshTokenData, AccessTokenData {}

@Injectable()
export class JwtService {
  checkAccessToken(token: string): AccessTokenData {
    try {
      let verifyedToken = verify(token, process.env.JWT_SECRET);
      return verifyedToken as AccessTokenData;
    } catch (e) {
      return { _id: '-1', role: -1 };
    }
  }

  checkRefreshToken(token: string): RefreshTokenData {
    return verify(token, process.env.JWT_SECRET) as RefreshTokenData;
  }

  generateTokens(generateTokensArgs: GenerateTokensArgs): Tokens {
    return {
      accessToken: sign(
        { _id: generateTokensArgs._id, role: generateTokensArgs.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_REFRESH_TIME },
      ),
      refreshToken: sign(
        { _id: generateTokensArgs._id, role: generateTokensArgs.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_REFRESH_TIME },
      ),
    };
  }
}
