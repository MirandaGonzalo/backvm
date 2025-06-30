import { ApiProperty } from '@nestjs/swagger';

export class AllLocalidadDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;
}
