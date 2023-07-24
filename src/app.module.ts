import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NinjasModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), // environment
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
