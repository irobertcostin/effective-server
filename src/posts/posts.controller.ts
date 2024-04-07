import { Body, Controller, Get, NotFoundException, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Category, Posts } from './schemas/posts.schema';
import { CreatePostsDto } from './dto/create-posts.dto';
import { Query as ExpressQuery } from "express-serve-static-core"
import { FilterCategories } from './dto/filter-categories.dto';
import { FilterResponse } from './dto/response-filter.dto';


@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) { }


    @Get()
    async getAllPosts(
        @Query() query: ExpressQuery
    ): Promise<Posts[]> {

        const posts = await this.postsService.findAll(query)

        if (!posts) {
            throw new NotFoundException('No posts found')
        }

        return posts

        // return this.postsService.findAll()

    }

    @Get('/count')
    async getPostsCount(): Promise<Number> {
        return this.postsService.getCount()

    }

    @Post("/new")
    async createPost(
        @Body()
        post: CreatePostsDto
    ): Promise<Posts> {
        return this.postsService.create(post)
    }

    @Post("/filter/categories")
    async filterByCategories(
        @Body()
        categories: FilterCategories,
        @Query() query: ExpressQuery
    ): Promise<FilterResponse> {
        return this.postsService.filterCategories(categories?.categories, query)
    }


}
