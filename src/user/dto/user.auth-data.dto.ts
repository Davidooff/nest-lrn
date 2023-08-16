import {
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserAuthData {
  @IsString()
  @Length(4, 20)
  login: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;
}

export class RefreshData {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class UpdateRole {
  @IsNotEmpty()
  @IsString()
  _id: string;
  @IsNotEmpty()
  @IsInt()
  role: number;
}
