import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateBulkProvinciaDto {

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  nombre: string;
}
