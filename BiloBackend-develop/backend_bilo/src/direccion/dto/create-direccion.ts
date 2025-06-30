import { IsInt, IsOptional } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDireccionDto {
    
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    idProvincia: number;
    
    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    idLocalidad: number;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    barrio: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    calle: string;
    
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    numeroCalle: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    piso: string | null;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    departamento: string | null;

    constructor(data?: any) {
        this.idProvincia = data? data.idProvincia : null;
        this.idLocalidad = data? data.idLocalidad : null;
        this.barrio = data? data.barrio : '';
        this.calle = data? data.calle : '';
        this.numeroCalle = data? data.numeroCalle : '';
        this.piso = data? data.piso : '';
        this.departamento = data? data.departamento : null;
    }

}