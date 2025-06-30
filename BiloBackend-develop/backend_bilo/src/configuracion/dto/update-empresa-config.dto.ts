import { Type } from "class-transformer";
import { IsEmail, IsInt, IsOptional, IsString } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { UpdateDireccionDto } from "src/direccion/dto/update-direccion.dto";
import { IsCUIT } from "src/shared/decorators/class-validator.decorator";

export class UpdateEmpresaConfigDto {

    @IsInt()
    @IsOptional()
    id?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    razonSocial?: string;

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
    telefono?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    @IsEmail()
    email?: string;

    @Type(() => UpdateDireccionDto)
    @IsOptional()
    @ApiPropertyOptional()
    direccion?: UpdateDireccionDto;

}