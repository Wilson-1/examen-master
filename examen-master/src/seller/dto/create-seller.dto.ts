// src/seller/dto/create-seller.dto.ts

import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateSellerDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    // CORRECCIÓN: El campo obligatorio de Prisma es 'mail', no 'email'
    @IsEmail()
    @IsNotEmpty()
    readonly mail: string; // <-- Corregido para coincidir con el schema de Prisma
    
    @IsString()
    @IsNotEmpty()
    @MinLength(6) 
    readonly password: string; // Asumo que este campo también existe en el modelo.

    // CAMPOS FALTANTES OBLIGATORIOS:
    
    @IsString()
    @IsNotEmpty()
    readonly address: string; // <-- Agregado

    @IsString() // Asumo que cell es un string (número de teléfono)
    @IsNotEmpty()
    readonly cell: string;    // <-- Agregado
}