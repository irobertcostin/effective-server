import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, Posts } from './schemas/posts.schema';
import * as mongoose from 'mongoose';
import { Query } from "express-serve-static-core";
import { FilterResponse } from './dto/response-filter.dto';


@Injectable()
export class PostsService {
    constructor(
        @InjectModel(Posts.name)
        private postsModel: mongoose.Model<Posts>
    ) { }



    async findAll(query: Query): Promise<FilterResponse> {

        const resPerPage = 15;
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)


        const aggregationPipeline: any[] = [
            {
                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    posts: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    count: 1,
                    posts: { $slice: ["$posts", skip, resPerPage] }
                }
            }
        ]

        const result = await this.postsModel.aggregate(aggregationPipeline).exec();

        if (result.length === 0) {
            return {
                count: 0,
                posts: []
            };
        }

        const { count, posts } = result[0];
        return { count, posts };


        // const posts = await this.postsModel.find().limit(resPerPage).skip(skip).sort({ createdAt: -1 })
    }


    async create(post: Posts): Promise<Posts> {
        const res = await this.postsModel.create(post)
        return res;
    }


    async getCount(): Promise<Number> {

        const posts = await this.postsModel.find();
        const count = posts.length
        return count

    }


    async filterCategories(categories: Category[], query: Query): Promise<FilterResponse> {

        const resPerPage = 15;
        const currentPage = Number(query.page) || 1
        const skip = resPerPage * (currentPage - 1)

        const aggregationPipeline: any[] = [
            {
                $match: {
                    category: { $in: categories }
                }
            },
            {

                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    posts: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    count: 1,
                    posts: { $slice: ["$posts", skip, resPerPage] }
                }
            }
        ];

        const result = await this.postsModel.aggregate(aggregationPipeline).exec();

        if (result.length === 0) {
            return {
                count: 0,
                posts: []
            };
        }

        const { count, posts } = result[0];
        return { count, posts };


    }



    async searchInTitles(query: Query): Promise<FilterResponse> {



        const { searchFor, page } = query
        const pag = +page


        const resPerPage = 15;
        const currentPage = Number(+page) || 1
        const skip = resPerPage * (currentPage - 1)


        const aggregationPipeline: any[] = [
            {
                $match: {
                    title: { $regex: searchFor, $options: 'i' }
                }
            },
            {

                $sort: { createdAt: -1 }
            },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    posts: { $push: "$$ROOT" }
                }
            },
            {
                $project: {
                    count: 1,
                    posts: { $slice: ["$posts", skip, resPerPage] }
                }
            }
        ];


        const result = await this.postsModel.aggregate(aggregationPipeline).exec();

        if (result.length === 0) {
            return {
                count: 0,
                posts: []
            };
        }

        const { count, posts } = result[0];
        return { count, posts };

    }



    async findPostById(query: Query): Promise<any> {

        const post = await this.postsModel.findById(query.id)

        if (!post) {
            throw new NotFoundException('No posts found')
        }
        return post

    }



    async editPostById(query: Query, body: any): Promise<Posts> {

        const post = await this.postsModel.findById(query.id)

        if (!post) {
            throw new NotFoundException('No posts found')
        }

        if (body.image_url) {
            post.image_url = body.image_url
        }

        if (body.title) {
            post.title = body.title
        }

        if (body.category) {
            post.category = body.category
        }

        if (body.short_description) {
            post.short_description = body.short_description
        }

        if (body.description_1) {
            post.description_1 = body.description_1
        }

        if (body.description_2) {
            post.description_2 = body.description_2
        }

        if (body.description_3) {
            post.description_3 = body.description_3
        }

        if (body.description_4) {
            post.description_4 = body.description_4
        }

        if (body.description_5) {
            post.description_5 = body.description_5
        }

        await post.save()

        return post;

    }


    async deletePostById(query: Query): Promise<any> {

        const post = await this.postsModel.findByIdAndDelete(query.id)

        console.log(post);
        if (!post) {
            throw new NotFoundException('No posts found')
        }
        return { message: "Post deleted" }

    }

}
