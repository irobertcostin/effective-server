import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsSchema } from './schemas/posts.schema';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports: [
    PostsModule,
    MongooseModule.forFeature([{ name: "Posts", schema: PostsSchema }])
  ]
})
export class PostsModule { }
