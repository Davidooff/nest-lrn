import { IsInt, IsNotEmpty } from 'class-validator';

export class ParamsNinjaDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  weapon: string;

  @IsNotEmpty()
  @IsInt()
  age: number;

  @IsNotEmpty()
  color: string;
}
