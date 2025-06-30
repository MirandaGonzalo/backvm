import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-user-dto';
import { UpdateUsuarioDto } from './dto/update-user-dto';
import { UsuarioService } from './usuario.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Public } from 'src/shared/decorators/public.decorator';

@ApiTags('Usuarios')
@Controller('usuario')
export class UsuarioController {
    constructor(private readonly usuarioService: UsuarioService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    async getUsuarios() {
        return this.usuarioService.findAll();
    }

    @Post()
    @Public()
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado correctamente' })
    async create(@Body() createUsuarioDto: CreateUsuarioDto) {
        return this.usuarioService.create(createUsuarioDto);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un usuario por su ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async findOne(@Param('id') id: string) {
        return this.usuarioService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un usuario por su ID' })
    @ApiResponse({ status: 200, description: 'Usuario actualizado o sin cambios' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    async update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
        await this.usuarioService.updateUser(Number(id), updateUsuarioDto);
        return {
            statusCode: 200,
            message: 'Usuario actualizado con correctamente.'
        }

    }
}
