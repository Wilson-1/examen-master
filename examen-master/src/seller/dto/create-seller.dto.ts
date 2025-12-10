import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateSellerDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsEmail()
    @IsNotEmpty()
    readonly mail: string; 
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6) 
    readonly password: string; 
    
    @IsString()
    @IsNotEmpty()
    readonly address: string; 

    @IsString() 
    @IsNotEmpty()
    readonly cell: string;    
}