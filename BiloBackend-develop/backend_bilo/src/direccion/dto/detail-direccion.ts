import { ApiProperty } from "@nestjs/swagger";

export class DireccionDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  idProvincia: number;

  @ApiProperty()
  provincia: string;

  @ApiProperty()
  idLocalidad: number;

  @ApiProperty()
  localidad: string;

  @ApiProperty()
  barrio: string;

  @ApiProperty()
  calle: string;

  @ApiProperty()
  numeroCalle: string;

  @ApiProperty({ example: null, nullable: true })
  piso: string | null;

  @ApiProperty({ example: null, nullable: true })
  departamento: string | null;

  constructor(data?: any) {
    this.id = data? data.id: null;
    this.idProvincia = data? data.provincia.id: null;
    this.provincia = data? data.provincia.nombre: '';
    this.idLocalidad = data? data.localidad.id: null;
    this.localidad = data? data.localidad.nombre: '';
    this.barrio = data? data.barrio: '';
    this.calle = data? data.calle: '';
    this.numeroCalle = data? data.numeroCalle: '';
    this.piso = data? data.piso: '';
    this.departamento = data? data.departamento: '';
  }
}
