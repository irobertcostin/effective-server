import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Clients } from './schemas/clients.schema';
import { CreateClientDto } from './dto/create-clients.dto';

@Controller('clients')
export class ClientsController {



    constructor(private clientsService: ClientsService) { }


    @Get()
    async getAllClients(): Promise<Clients[]> {
        return this.clientsService.findAll()
    }




    @Get(':id')
    async getClientById(
        @Param('id')
        id: string
    ): Promise<Clients> {
        const client = await this.clientsService.findCliendById(id);
        return client;
    }






    @Post('new')
    async createClient(
        @Body()
        client: CreateClientDto
    ): Promise<Clients> {
        return this.clientsService.createClient(client)
    }





}
