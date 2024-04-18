import { IsNotEmpty, IsString } from "class-validator"




export class GetUserDto {



    @IsNotEmpty()
    @IsString()
    readonly username: string

    @IsNotEmpty()
    @IsString()
    readonly first_name: string


    @IsNotEmpty()
    @IsString()
    readonly last_name: string


}