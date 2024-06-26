import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule } from './clients/clients.module';
import { UsersService } from './users/users.service';
import { ClientsService } from './clients/clients.service';
import { UsersController } from './users/users.controller';
import { ClientsController } from './clients/clients.controller';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    PostsModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService],
})
export class AppModule { }
