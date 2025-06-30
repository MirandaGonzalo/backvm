import { IsEmail, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUsuarioDto {
  @ApiProperty({ example: 'Juan Pérez', description: 'Nombre completo del usuario' })
  @IsString()
  @IsOptional()
  @MaxLength(50)
  nombre: string;

  @ApiProperty({ example: 'juan@example.com', description: 'Correo electrónico único' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Contraseña del usuario' })
  @IsOptional()
  @IsString()
  @MinLength(8)
  contraseña: string;
}