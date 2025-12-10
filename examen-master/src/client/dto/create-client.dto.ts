import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly mail: string; 

    @IsString()
    @IsNotEmpty()

    readonly phone: string; 

}