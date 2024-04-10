import { IsNotEmpty, MinLength, IsString } from "class-validator"




export class LoginUserDto {



    @IsNotEmpty()
    @IsString()
    readonly username: string

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string



}