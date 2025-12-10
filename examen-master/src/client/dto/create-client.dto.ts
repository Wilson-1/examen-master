// Asumo que ya instalaste class-validator: npm install class-validator class-transformer
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateClientDto {
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    // CORRECCIÓN CLAVE: Cambiar 'email' por 'mail' para que coincida con Prisma
    @IsEmail()
    @IsNotEmpty()
    readonly mail: string; 

    @IsString()
    @IsNotEmpty()
    // Asumo que el campo en Prisma se llama 'phone' o 'cell'
    readonly phone: string; 
    
    // NOTA: Si tu modelo Client requiere otros campos obligatorios 
    // (como 'address' o 'cell' si 'phone' no es el nombre correcto), 
    // debes AGREGARLOS aquí para resolver completamente el error 2322.
}