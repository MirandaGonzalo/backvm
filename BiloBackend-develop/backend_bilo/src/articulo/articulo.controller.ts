import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiNotFoundResponse } from '@nestjs/swagger';
import { ArticuloService } from './articulo.service';
import { ArticuloResponseDto } from './dto/articulo-response.dto';
import { CreateArticuloDto } from './dto/create-articulo-dto';
import { UpdateArticuloDto } from './dto/update-articulo.dto';

@ApiTags('Articulos')
@Controller('articulo')
export class ArticuloController {
    constructor (private readonly articuloService: ArticuloService) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los artículos' })
    @ApiResponse({
        status: 200,
        description: 'Lista de artículos con estado formateado',
        type: [ArticuloResponseDto],
    })
    async getArticulos(){
        return this.articuloService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un artículo por su ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Artículo encontrado' })
    @ApiResponse({ status: 404, description: 'Artículo no encontrado' })
    async findOne(@Param('id') id: Number) {
        return this.articuloService.findOne(Number(id));
    }

    @Put('eliminar/:id')
    @ApiOperation({ summary: 'Cambiar el estado de un Artículo' })
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Cambiar el estado (activo/inactivo) de un artículo' })
    @ApiResponse({status: 200,description: 'Artículo encontrado y estado actualizado correctamente',
        schema: {
            example: {
            message: 'El estado del artículo fue cambiado a Activo',
            },
        },
    })
    @ApiNotFoundResponse({description: 'No se encontró el artículo con el ID especificado',
        schema: {
            example: {
            statusCode: 404,
            message: 'No se encontró el artículo con ID 123',
            error: 'Not Found',
            },
        },
    })
    async statusCliente(@Param('id') id: number) {
        return this.articuloService.changeStatus(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo artículo' })
    @ApiBody({ type: CreateArticuloDto })
    @ApiResponse({ status: 201, description: 'Artículo creado correctamente', 
        type: ArticuloResponseDto })
    @ApiResponse({ status: 400, description: 'Error al crear el artículo',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al crear el artículo',
            error: 'Bad Request',
            },
        },
    })
    @ApiResponse({ status: 500, description: 'Error interno del servidor',
        schema: {
            example: {
            statusCode: 500,
            message: 'Error interno del servidor',
            error: 'Internal Server Error',
            },
        },
    })
    async createArticulo(@Body() createArticuloDto: CreateArticuloDto): Promise<ArticuloResponseDto> {
        return this.articuloService.insert(createArticuloDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un artículo' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdateArticuloDto })
    @ApiResponse({ status: 200, description: 'Artículo actualizado correctamente', 
        type: UpdateArticuloDto })
    @ApiResponse({ status: 400, description: 'Error al actualizar el artículo',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al actualizar el artículo',
            error: 'Bad Request',
            },
        },
    })
    @ApiResponse({ status: 500, description: 'Error interno del servidor',
        schema: {
            example: {
            statusCode: 500,
            message: 'Error interno del servidor',
            error: 'Internal Server Error',
            },
        },
    })
    async updateCliente(@Param('id') id: number, @Body() updateArticuloDto: UpdateArticuloDto): Promise<ArticuloResponseDto> {
        return this.articuloService.update(id, updateArticuloDto);
    }

}
