import { IsString, MinLength, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty({ example: 'Juan21', description: 'Nombre de usuario' })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    nombre_usuario: string;

    @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(255)
    contraseña: string;
}