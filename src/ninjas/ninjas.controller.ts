import {
  Body,
  Controller,
  Get,
  Options,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { ParamsNinjaDto } from './dto/params-ninja.dto';
import { UserGuard } from 'src/user/user.guard';

const service = new NinjasService();
@Controller('ninjas')
@UseGuards(UserGuard)
export class NinjasController {
  @Get()
  getAllNinjas(): Array<CreateNinjaDto> {
    return service.all();
  }

  @Options('/filter')
  filterNinjas(@Body() updateNinjaDto: UpdateNinjaDto) {
    return service.filter(updateNinjaDto);
  }

  @Get(':id')
  getOneNinja(@Param('id') id: number) {
    return service.filter({ id });
  }

  @Post()
  createNinja(@Body() paramsNinjaDto: ParamsNinjaDto) {
    return service.create(paramsNinjaDto);
  }

  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return {
      id,
      updateNinjaDto,
    };
  }
}
