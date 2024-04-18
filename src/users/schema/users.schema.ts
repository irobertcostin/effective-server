import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema({
    timestamps: true
})



export class User extends Document {
    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop({ unique: [true, 'This username is already in use'] })
    username: string

    @Prop()
    password: string


}


export const UserSchema = SchemaFactory.createForClass(User)