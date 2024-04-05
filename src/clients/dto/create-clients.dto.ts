import { Status } from "../schemas/clients.schema"

export class CreateClientDto {
    readonly first_name: string
    readonly last_name: string
    readonly company: string
    readonly email: string
    readonly phone: string
    readonly message: string
    readonly status: Status

}