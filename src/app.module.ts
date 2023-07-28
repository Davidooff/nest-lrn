import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NinjasModule } from './ninjas/ninjas.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    NinjasModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }), // environment
    MongooseModule.forRoot(process.env.MONGODB_URL),
    RoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
