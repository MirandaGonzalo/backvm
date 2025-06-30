import { Type } from "class-transformer";
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateDireccionDto } from "src/direccion/dto/create-direccion";
import { IsCUIT } from "src/shared/decorators/class-validator.decorator";

export class CreateClienteDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    nombre: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    apellido: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    idTipoDocumento: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    dni: string;

    @IsString()
    @IsNotEmpty()
    @IsCUIT({
        message: 'El CUIT proporcionado no es válido'
    })
    @ApiProperty({ example: '20-12345678-2', description: 'CUIT con formato xx-xxxxxxxx-x' })
    cuit: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional()
    codigo: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    telefono: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    email: string;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty()
    idCondicionIva: number;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional()
    habilitaCtacte: boolean;

    @Type(() => CreateDireccionDto)
    @IsNotEmpty()
    @ApiProperty()
    direccion: CreateDireccionDto;
}
