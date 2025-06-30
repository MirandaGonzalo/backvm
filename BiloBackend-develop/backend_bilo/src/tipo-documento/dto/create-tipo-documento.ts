import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateTipoDocumentoDto {
    @ApiProperty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    @IsNotEmpty()
    nombre: string;
}