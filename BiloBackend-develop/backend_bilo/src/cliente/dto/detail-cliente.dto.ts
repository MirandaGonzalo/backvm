import { ApiProperty } from '@nestjs/swagger';
import { UtilsService } from 'src/shared/utils/utils.service';
import { DireccionDTO } from 'src/direccion/dto/detail-direccion';

export class ClienteDetailDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  codigo: string;
  
  @ApiProperty({ example: '20-12345678-2', description: 'CUIT con formato xx-xxxxxxxx-x' })
  cuit: string;

  @ApiProperty()
  idTipoDocumento: number;

  @ApiProperty()
  tipoDocumento: string;

  @ApiProperty()
  dni: string;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellido: string;

  @ApiProperty()
  idCondicionIva: number;

  @ApiProperty()
  condicionIva: string;

  @ApiProperty()
  telefono: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  habilitaCtacte: boolean;

  @ApiProperty()
  idDireccion: number;

  @ApiProperty()
  estado: boolean;

  @ApiProperty({ enum: ['Activo', 'Inactivo'] })
  estado_cliente: string;

  @ApiProperty({ type: DireccionDTO })
  direccion: DireccionDTO;

  constructor(data: any) {
    this.id = data.id;
    this.codigo = data.codigo;
    this.cuit = data.cuit;
    this.idTipoDocumento = data.idTipoDocumento;
    this.tipoDocumento = data.tipoDocumento.nombre;
    this.dni = data.dni;
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.idCondicionIva = data.idCondicionIva;
    this.condicionIva = data.condicionIva.nombre;
    this.telefono = data.telefono;
    this.email = data.email;
    this.habilitaCtacte = data.habilitaCtacte;
    this.idDireccion = data.idDireccion;
    this.estado = data.estado;
    this.estado_cliente = UtilsService.estadoToTexto(data.estado);

    this.direccion = new DireccionDTO(data.direccion);
  }
}