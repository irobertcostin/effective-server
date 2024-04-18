import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Category, Posts } from './schemas/posts.schema';
import { CreatePostsDto } from './dto/create-posts.dto';
import { Query as ExpressQuery } from "express-serve-static-core"
import { FilterCategories } from './dto/filter-categories.dto';
import { FilterResponse } from './dto/response-filter.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('posts')
export class PostsController {

    constructor(private postsService: PostsService) { }


    @Get('all')
    async getAllPosts(
        @Query() query: ExpressQuery
    ): Promise<FilterResponse> {
        const posts = await this.postsService.findAll(query)
        if (!posts) {
            throw new NotFoundException('No posts found')
        }
        return posts
    }

    @Get('count')
    async getPostsCount(): Promise<Number> {
        return this.postsService.getCount()
    }

    @Post("new")
    @UseGuards(AuthGuard())
    async createPost(
        @Body()
        post: CreatePostsDto
    ): Promise<Posts> {
        return this.postsService.create(post)
    }

    @Post("filter/categories")
    async filterByCategories(
        @Body()
        categories: FilterCategories,
        @Query() query: ExpressQuery
    ): Promise<FilterResponse> {
        return this.postsService.filterCategories(categories?.categories, query)
    }


    @Get("search")
    async searchByString(
        @Query() query: ExpressQuery
    ): Promise<FilterResponse> {
        const posts = await this.postsService.searchInTitles(query)

        if (!posts) {
            throw new NotFoundException('No posts found')
        }
        return posts
    }


    @Get("id")
    async getPostById(
        @Query() query: ExpressQuery
    ): Promise<Posts> {
        return this.postsService.findPostById(query)
    }



    @Put("edit/id")
    @UseGuards(AuthGuard())
    async editPost(
        @Body()
        body: any,
        @Query()
        query: ExpressQuery
    ): Promise<Posts> {
        return this.postsService.editPostById(query, body)
    }


    @Delete("delete/id")
    @UseGuards(AuthGuard())
    async deletePost(
        @Query()
        query: ExpressQuery
    ): Promise<any> {
        return this.postsService.deletePostById(query)
    }



}
