import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProvinciaDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  nombre: string;
}
