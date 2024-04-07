import { Injectable } from '@nestjs/common';
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



    async findAll(query: Query): Promise<Posts[]> {

        const resPerPage = 15;
        const currentPage = Number(query.page) || 1

        const skip = resPerPage * (currentPage - 1)

        const posts = await this.postsModel.find().limit(resPerPage).skip(skip).sort({ createdAt: -1 })

        // const posts = await this.postsModel.find().sort({ createdAt: -1 })
        return posts
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





}
