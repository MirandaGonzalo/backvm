import { ApiProperty } from '@nestjs/swagger';

export class AllCondicionIvaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;
}
