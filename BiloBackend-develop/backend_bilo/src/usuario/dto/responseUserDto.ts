import { ApiProperty } from "@nestjs/swagger";

export class ResponseUserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    nombre_usuario: string;

    @ApiProperty()
    email: string;
}