import { Posts } from "../schemas/posts.schema";


export class FilterResponse {
    count: number
    posts: Posts[]
}