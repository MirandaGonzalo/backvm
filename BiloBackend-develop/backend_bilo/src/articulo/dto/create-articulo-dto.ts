import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, IsNumber } from 'class-validator';

export class CreateArticuloDto {

  @ApiProperty({description: 'Código único del artículo',example: '100002',})
  @IsString()
  codigo: string;

  @ApiProperty({description: 'Código de barra del artículo',example: '100-002',})
  @IsString()
  codigo_barra: string;

  @ApiProperty({description: 'Nombre del artículo (máximo 50 caracteres)',example: 'Articulo de prueba',})
  @IsString()
  nombre: string;

  @ApiProperty({description: 'Descripción del artículo (máximo 200 caracteres)',example: 'Este es un artículo de prueba con descripción opcional.',required: false,})
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({description: 'Indica si el artículo es de producción propia',example: true,default: true,})
  @IsOptional()
  @IsBoolean()
  produccionPropia?: boolean = true;

  @ApiProperty({description: 'Indica si el artículo es pesable',example: true,default: true,})
  @IsOptional()
  @IsBoolean()
  pesable?: boolean = true;
}