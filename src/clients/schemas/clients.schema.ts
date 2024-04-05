import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export enum Status {
    CONTACTED = "Contacted",
    MUST_CONTACT = "Must Contact"
}




@Schema({
    timestamps: true
})


export class Clients {

    @Prop()
    first_name: string;

    @Prop()
    last_name: string;

    @Prop()
    company: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop({ maxlength: 300 })
    message: string;

    @Prop()
    status: Status;


}

export const ClientsSchema = SchemaFactory.createForClass(Clients)