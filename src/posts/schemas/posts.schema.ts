import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum Category {
    MARKETING = "Marketing",
    SEO = 'SEO',
    SOCIAL_MEDIA = "Social Media",
    APP_DEVELOPMENT = "App Development",
    CONTENT_CREATION = "Content Creation",
    BRANDING_DESIGN = 'Branding & Design',
    NEWS = "News"
}


@Schema({
    timestamps: true
})

export class Posts {

    @Prop()
    title: string;

    @Prop()
    category: Category;

    @Prop()
    author: string


    @Prop()
    short_description: string



    @Prop()
    description_1: string

    @Prop()
    description_2: string

    @Prop()
    description_3: string

    @Prop()
    description_4: string


    @Prop()
    description_5: string


    @Prop()
    image_url: string


}


export const PostsSchema = SchemaFactory.createForClass(Posts)