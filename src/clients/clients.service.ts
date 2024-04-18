import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Clients } from './schemas/clients.schema';
import mongoose from 'mongoose';
import { Status } from './schemas/clients.schema';
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

    async markClient(id: any): Promise<any> {

        console.log(id);
        const client = await this.clientsModel.findById(id)

        if (!client) {
            throw new NotFoundException(`Object with ${id} could not be found`)
        }

        client.status = Status.CONTACTED
        await client.save();

        return { message: "Modified successfully" };

    }

    async createClient(client: Clients): Promise<Clients> {
        const res = await this.clientsModel.create(client)
        return res
    }




}
