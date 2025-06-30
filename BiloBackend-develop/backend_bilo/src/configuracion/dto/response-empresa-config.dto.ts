import { ApiProperty } from '@nestjs/swagger';
import { DireccionDTO } from 'src/direccion/dto/detail-direccion';

export class ResponseEmpresaConfigDto {

  @ApiProperty()
  razonSocial: string;

  @ApiProperty()
  cuit: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  direccion: DireccionDTO;

  constructor(data?: any) {
    this.razonSocial = data? data.razonSocial: '';
    this.cuit = data? data.cuit: '';
    this.telefono = data? data.telefono: '';
    this.email = data? data.email: '';
    this.direccion = data? new DireccionDTO(data.direccion): new DireccionDTO(null);
  }

}