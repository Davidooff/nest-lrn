import { Module } from '@nestjs/common';
import { NinjasController } from './ninjas.controller';
import { NinjasService } from './ninjas.service';
import { JwtService } from 'src/user/jwt/jwt.service';

@Module({
  controllers: [NinjasController],
  providers: [NinjasService, JwtService],
})
export class NinjasModule {}
