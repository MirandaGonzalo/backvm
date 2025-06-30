import { IsInt, IsOptional } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateDireccionDto {

    @IsInt()
    @IsOptional()
    id?: number;
    
    @IsInt()
    @IsOptional()
    @ApiPropertyOptional()
    idProvincia?: number;
    
    @IsInt()
    @IsOptional()
    @ApiPropertyOptional()
    idLocalidad?: number;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    barrio?: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    calle?: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    numeroCalle?: string;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    piso?: string | null;
    
    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    departamento?: string | null;

}