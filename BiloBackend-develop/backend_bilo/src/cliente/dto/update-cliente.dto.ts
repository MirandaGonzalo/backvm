import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { UpdateDireccionDto } from "src/direccion/dto/update-direccion.dto";
import { IsCUIT } from "src/shared/decorators/class-validator.decorator";

export class UpdateClienteDto {

    @IsInt()
    @IsOptional()
    id?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    nombre?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    apellido?: string;

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional()
    idTipoDocumento?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    dni?: string;

    @IsString()
    @IsOptional()
    @IsCUIT({
        message: 'El CUIT proporcionado no es válido'
    })
    @ApiPropertyOptional({ example: '20-12345678-2', description: 'CUIT con formato xx-xxxxxxxx-x' })
    cuit?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    codigo?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    telefono?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    @IsEmail()
    email?: string;

    @IsInt()
    @IsOptional()
    @ApiPropertyOptional()
    idCondicionIva?: number;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    habilitaCtacte?: boolean;

    @Type(() => UpdateDireccionDto)
    @IsOptional()
    @ApiPropertyOptional()
    direccion?: UpdateDireccionDto;
}
