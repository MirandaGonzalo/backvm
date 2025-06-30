import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsBoolean, IsInt } from 'class-validator';

export class UpdateArticuloDto {

  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Código único del artículo',example: '100002' })
  codigo?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Código de barra del artículo',example: '100-002' })
  codigo_barra?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Nombre del artículo',example: 'Articulo de prueba' })
  nombre?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Descripción del artículo',example: 'Este es un artículo de prueba con descripción opcional.',required: false })
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: 'Indica si es de producción propia',example: true,default: true})
  produccionPropia?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: 'Indica si es pesable', example: true,default: true })
  pesable?: boolean;

  @IsOptional()
  @IsBoolean()
  @ApiPropertyOptional({ description: 'Estado del artículo', example: true,default: true})
  estado?: boolean;
}