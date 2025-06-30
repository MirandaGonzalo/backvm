import { IsInt, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateContabilidadConfigDto {

    @IsInt()
    @IsOptional()
    id?: number;

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional()
    idCondicionIva?: number;

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional()
    puntoDeVenta?: number;

}
