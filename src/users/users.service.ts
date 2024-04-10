import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/users.schema';
import mongoose from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from "bcryptjs"
import { LoginUserDto } from './dto/login.dto';


@Injectable()
export class UsersService {


    constructor(
        @InjectModel(User.name)
        private userModel: mongoose.Model<User>,
        private jwtService: JwtService
    ) { }



    async register(createUserDto: CreateUserDto): Promise<{ token: string }> {

        try {

            const { first_name, last_name, username, password } = createUserDto;

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.userModel.create({
                first_name, last_name, username, password: hashedPassword
            })


            const token = this.jwtService.sign({ id: user._id, })


            return { token }
        } catch (error) {
            if (error.code === 11000 && error.keyPattern?.username) {

                throw new ConflictException('Username is already in use.');
            }
            throw error;
        }

    }





    async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
        try {

            const { username, password } = loginUserDto;
            const user = await this.userModel.findOne({ username })

            if (!user) {
                throw new NotFoundException('Invalid username address')
            }

            const isPasswordMatched = await bcrypt.compare(password, user.password)


            if (!isPasswordMatched) {
                throw new UnauthorizedException('Invalid password')
            }


            const token = this.jwtService.sign({ id: user._id })

            return { token }


        } catch (error: any) {
            return error.response;
        }
    }







}
