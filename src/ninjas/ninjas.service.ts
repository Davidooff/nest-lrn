import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { randomInt } from 'crypto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { log } from 'console';
import { ParamsNinjaDto } from './dto/params-ninja.dto';

@Injectable()
export class NinjasService {
  private readonly ninjas: Array<CreateNinjaDto> = [
    {
      id: 0,
      name: 'Leo',
      weapon: 'Knife',
      age: 36,
      color: 'green',
    },
    {
      id: 1,
      name: 'Kail',
      weapon: 'Bomb',
      age: 27,
      color: 'yellow',
    },
    {
      id: 2,
      name: 'Leo Jr',
      weapon: 'sword',
      age: 36,
      color: 'darkblue',
    },
    {
      id: 3,
      name: 'Leo Old',
      weapon: 'Knife',
      age: 36,
      color: 'darkgreen',
    },
  ];

  all() {
    return this.ninjas;
  }

  filter(updateNinjaDto: UpdateNinjaDto): Array<CreateNinjaDto> {
    return this.ninjas.filter((el) => {
      let keys = Object.keys(updateNinjaDto);
      for (let i = 0; i < keys.length; i++) {
        if (updateNinjaDto[keys[i]] !== el[keys[i]]) {
          return false;
        }
      }
      return true;
    });
  }

  create(paramsNinjaDto: ParamsNinjaDto): CreateNinjaDto {
    const newNinja: CreateNinjaDto = {
      id: this.generateId(),
      ...paramsNinjaDto,
    };
    this.ninjas.push({ id: this.generateId(), ...paramsNinjaDto });
    return newNinja;
  }

  generateId(): number {
    // generate random id
    return randomInt(100000);
  }
}
