import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  nombre_usuario: string;

  @ApiProperty({ example: 'juan@example.com', description: 'Correo electrónico único' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  @IsString()
  @MinLength(8)
  @MaxLength(255)
  contraseña: string;
}