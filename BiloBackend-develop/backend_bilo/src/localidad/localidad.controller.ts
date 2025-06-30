import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LocalidadService } from './localidad.service';
import { CreateLocalidadDto } from './dto/create-localidad';
import { AllLocalidadDto } from './dto/all-localidad';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('localidad')
export class LocalidadController {

    constructor(
        private readonly localidadService: LocalidadService
    ) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Localidades obtenidas correctamente',
        type: [AllLocalidadDto] })
    @ApiResponse({ status: 500, description: 'Error interno del servidor',
        schema: {
            example: {
            statusCode: 500,
            message: 'Error interno del servidor',
            error: 'Internal Server Error',
            },
        },
    })
    async getAll(): Promise<AllLocalidadDto[]> {
        return this.localidadService.getAll();
    }

    @Get(':idprovincia')
    @ApiResponse({ status: 200, description: 'Localidades obtenidas correctamente',
        type: [AllLocalidadDto] })
    @ApiResponse({ status: 400, description: 'Error al obtener las localidades',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al obtener las localidades',
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
    async getAllByProvincia(@Param('idprovincia') idprovincia: number): Promise<AllLocalidadDto[]> {
        return this.localidadService.getAllByProvincia(idprovincia);
    }

    @Post()
    @ApiBody({ type: CreateLocalidadDto })
    @ApiResponse({ status: 201, description: 'Localidad creada correctamente',
        type: AllLocalidadDto })
    @ApiResponse({ status: 400, description: 'Error al crear la localidad',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al crear la localidad',
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
    async insert(@Body() data: CreateLocalidadDto): Promise<number> {
        return this.localidadService.insert(data);
    }

    @Post('bulk')
    @ApiOperation({ summary: 'Crear varias localidades' })
    @ApiBody({ type: [CreateLocalidadDto] })
    @ApiResponse({ status: 201, description: 'Localidades creadas correctamente', type: String })
    @ApiResponse({ status: 400, description: 'Error al crear las localidades',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al crear las localidades',
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
    async bulkInsert(@Body() data: CreateLocalidadDto[]): Promise<string> {
        return this.localidadService.bulkInsert(data);
    }
}
