import { Category } from "../schemas/posts.schema";



export class CreatePostsDto {

    readonly title: string
    readonly category: Category
    readonly author: string
    readonly short_description: string
    readonly description_1: string
    readonly description_2: string
    readonly description_3: string
    readonly description_4: string
    readonly description_5: string
    readonly image_url: string

}