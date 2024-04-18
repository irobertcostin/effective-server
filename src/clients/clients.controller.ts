import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { Clients } from './schemas/clients.schema';
import { CreateClientDto } from './dto/create-clients.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('clients')
export class ClientsController {



    constructor(private clientsService: ClientsService) { }


    @Get()
    @UseGuards(AuthGuard())
    async getAllClients(): Promise<Clients[]> {
        return this.clientsService.findAll()
    }




    @Post('mark')
    @UseGuards(AuthGuard())
    async markContacted(
        @Body()
        client: any
    ): Promise<any> {
        // console.log(id);
        const response = await this.clientsService.markClient(client.id);
        return response;
    }






    @Post('new')
    async createClient(
        @Body()
        client: CreateClientDto
    ): Promise<Clients> {
        return this.clientsService.createClient(client)
    }





}
