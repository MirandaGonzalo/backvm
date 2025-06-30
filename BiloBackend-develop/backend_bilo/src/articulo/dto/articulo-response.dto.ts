import { ApiProperty } from '@nestjs/swagger';
import { UtilsService } from 'src/shared/utils/utils.service';

export class ArticuloResponseDto {
  @ApiProperty({ example: 1, description: 'Identificador único del producto' })
  id: number;

  @ApiProperty({ example: '1234567890123', description: 'Código único del producto' })
  codigo: string;

  @ApiProperty({ example: '134-2344', description: 'Código de barra del producto' })
  codigo_barra: string;

  @ApiProperty({ example: 'Pan de campo', description: 'Nombre del producto', maxLength: 50 })
  nombre: string;

  @ApiProperty({ example: 'Pan artesanal elaborado con masa madre', description: 'Descripción del producto', maxLength: 200 })
  descripcion: string;

  @ApiProperty({ example: true, description: 'Indica si el producto es de producción propia' })
  produccionPropia: boolean;

  @ApiProperty({ example: true, description: 'Indica si el producto se puede pesar' })
  pesable: boolean;

  @ApiProperty({ example: true, description: 'Indica si el estado' })
  estado: boolean;

  @ApiProperty({ enum: ['Si', 'No'] })
  produccion_propia: string;

  @ApiProperty({ enum: ['Si', 'No'] })
  es_pesable: string;

  @ApiProperty({ enum: ['Activo', 'Inactivo'] })
  estado_articulo: string;

  constructor(data: any) {
    this.id = data.id;
    this.codigo = data.codigo.toString();
    this.codigo_barra = data.codigo_barra;
    this.nombre = data.nombre;
    this.descripcion = data.descripcion ?? '';
    this.produccionPropia = data.produccionPropia;
    this.pesable = data.pesable;
    this.estado = data.estado;
    this.produccion_propia = UtilsService.tienePropiedad(data.produccionPropia);
    this.es_pesable = UtilsService.tienePropiedad(data.pesable);
    this.estado_articulo = UtilsService.estadoToTexto(data.estado);
  }
}