import { ApiProperty } from '@nestjs/swagger';

export class AllProvinciaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;
}
