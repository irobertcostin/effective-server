import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Clients } from './schemas/clients.schema';
import mongoose from 'mongoose';

@Injectable()
export class ClientsService {

    constructor(
        @InjectModel(Clients.name)
        private clientsModel: mongoose.Model<Clients>
    ) { }

    async findAll(): Promise<Clients[]> {
        const clients = await this.clientsModel.find()

        return clients
    }

    // async findByName(name: string): Promise<Clients> {
    //     const clients = await this.clientsModel.findOne({ where: { first_name: name } })
    //     return clients
    // }


    async findCliendById(id: string): Promise<Clients> {

        const res = await this.clientsModel.findById(id)

        if (!res) {
            throw new NotFoundException(`Object with ${id} could not be found`)
        }

        return res;

    }

    async createClient(client: Clients): Promise<Clients> {
        const res = await this.clientsModel.create(client)
        return res
    }




}
