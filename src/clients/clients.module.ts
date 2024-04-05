import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsSchema } from './schemas/clients.schema';

@Module({
  providers: [ClientsService],
  controllers: [ClientsController],
  imports: [
    ClientsModule,
    MongooseModule.forFeature([{ name: "Clients", schema: ClientsSchema }])
  ]
})
export class ClientsModule { }
