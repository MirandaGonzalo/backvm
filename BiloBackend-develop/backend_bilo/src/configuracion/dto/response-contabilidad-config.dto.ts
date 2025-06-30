import { ApiProperty } from "@nestjs/swagger";

export class ResponseContabilidadConfigDto {

    @ApiProperty()
    idCondicionIva: number;

    @ApiProperty()
    condicionIva: string;

    @ApiProperty()
    puntoDeVenta: number;

    constructor(data?: any) {
        this.idCondicionIva = data? data.idCondicionIva: null;
        this.condicionIva = data? data.condicionIva.nombre: '';
        this.puntoDeVenta = data? data.puntoDeVenta: null;
    }
}
