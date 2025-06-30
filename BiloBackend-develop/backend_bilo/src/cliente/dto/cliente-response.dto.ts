import { ApiProperty } from '@nestjs/swagger';
import { UtilsService } from 'src/shared/utils/utils.service';

export class ClienteResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codigo: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellido: string;

  @ApiProperty()
  tipoDocumento: string;

  @ApiProperty()
  dni: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: ['Activo', 'Inactivo'] })
  estado_cliente: string;

  constructor(data: any) {
    this.id = data.id;
    this.codigo = data.codigo;
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.tipoDocumento = data.tipoDocumento.nombre;
    this.dni = data.dni;
    this.telefono = data.telefono;
    this.email = data.email;
    this.estado_cliente = UtilsService.estadoToTexto(data.estado);
  }
}