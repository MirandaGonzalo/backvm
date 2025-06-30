import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiNotFoundResponse, ApiBody } from '@nestjs/swagger';
import { ClienteService } from './cliente.service';
import { ClienteResponseDto } from './dto/cliente-response.dto';
import { ClienteDetailDto } from './dto/detail-cliente.dto';
import { CreateClienteDto } from './dto/create-cliente-dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { ValidacionUtils } from 'src/shared/utils/validacion.util';

@ApiTags('Clientes')
@Controller('cliente')
export class ClienteController {
    constructor (
        private readonly clienteService : ClienteService,
        private readonly validacionUtil: ValidacionUtils
    ) {}

    @Get()
    @ApiOperation({ summary: 'Obtener todos los clientes' })
    @ApiResponse({
        status: 200,
        description: 'Lista de clientes con estado formateado',
        type: [ClienteResponseDto],
    })
    async getClientes(){
        return this.clienteService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un cliente por su ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiResponse({ status: 200, description: 'Cliente encontrado',type: [ClienteDetailDto], })
    @ApiResponse({ status: 404, description: 'Cliente no encontrado' })
    async findCliente(@Param('id') id: number) {
        return this.clienteService.findOne(id);
    }

    @Put('eliminar/:id')
    @ApiOperation({ summary: 'Cambiar el estado de un Cliente' })
    @ApiParam({ name: 'id', type: Number })
    @ApiOperation({ summary: 'Cambiar el estado (activo/inactivo) de un cliente' })
    @ApiResponse({status: 200,description: 'Cliente encontrado y estado actualizado correctamente',
        schema: {
            example: {
            message: 'El estado del cliente fue cambiado a Activo',
            },
        },
    })
    @ApiNotFoundResponse({description: 'No se encontró el cliente con el ID especificado',
        schema: {
            example: {
            statusCode: 404,
            message: 'No se encontró el cliente con ID 123',
            error: 'Not Found',
            },
        },
    })
    async statusCliente(@Param('id') id: number) {
        return this.clienteService.changeStatus(id);
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo cliente' })
    @ApiBody({ type: CreateClienteDto })
    @ApiResponse({ status: 201, description: 'Cliente creado correctamente', 
        type: ClienteResponseDto })
    @ApiResponse({ status: 400, description: 'Error al crear el cliente',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al crear el cliente',
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
    async createCliente(@Body() createClienteDto: CreateClienteDto): Promise<ClienteDetailDto> {
        return this.clienteService.insert(createClienteDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un cliente' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdateClienteDto })
    @ApiResponse({ status: 200, description: 'Cliente actualizado correctamente', 
        type: ClienteResponseDto })
    @ApiResponse({ status: 400, description: 'Error al actualizar el cliente',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al actualizar el cliente',
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
    async updateCliente(@Param('id') id: number, @Body() updateClienteDto: UpdateClienteDto): Promise<ClienteDetailDto> {
        return this.clienteService.update(id, updateClienteDto);
    }

}

