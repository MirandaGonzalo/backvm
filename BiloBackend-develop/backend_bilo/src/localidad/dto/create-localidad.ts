import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateLocalidadDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  nombre: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  idProvincia: number;
}
