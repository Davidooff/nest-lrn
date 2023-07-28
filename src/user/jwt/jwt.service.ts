import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

export interface AccessTokenData {
  role: number;
  _id: string;
}

export interface RefreshTokenData {
  _id: string;
}

interface GenerateTokensArgs extends RefreshTokenData, AccessTokenData {}

@Injectable()
export class JwtService {
  checkAccessToken(token: string): AccessTokenData {
    return verify(token, process.env.JWT_SECRET) as AccessTokenData;
  }

  checkRefreshToken(token: string): RefreshTokenData {
    return verify(token, process.env.JWT_SECRET) as RefreshTokenData;
  }

  generateTokens(generateTokensArgs: GenerateTokensArgs): {
    accessToke: string;
    refreshToken: string;
  } {
    console.log('generateTokens');
    return {
      accessToke: sign(
        { _id: generateTokensArgs._id, role: generateTokensArgs.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_REFRESH_TIME },
      ),
      refreshToken: sign(
        { _id: generateTokensArgs._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_REFRESH_TIME },
      ),
    };
  }
}
