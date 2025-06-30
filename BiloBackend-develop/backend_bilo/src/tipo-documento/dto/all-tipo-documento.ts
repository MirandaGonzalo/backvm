import { ApiProperty } from '@nestjs/swagger';

export class AllTipoDocumentoDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;
}
