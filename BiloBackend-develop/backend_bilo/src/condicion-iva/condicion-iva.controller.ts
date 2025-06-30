import { Body, Controller, Get, Post } from '@nestjs/common';
import { CondicionIvaService } from './condicion-iva.service';
import { AllCondicionIvaDto } from './dto/all-condicion-iva';
import { CreateCondicionIvaDto } from './dto/create-condicion-iva';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('condicion-iva')
export class CondicionIvaController {

    constructor(
        private readonly condicionIvaService: CondicionIvaService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todas las condiciones de IVA' })
    @ApiResponse({ status: 200, description: 'Condiciones de IVA obtenidas correctamente', type: [AllCondicionIvaDto] })
    @ApiResponse({ status: 500, description: 'Error interno del servidor',
        schema: {
            example: {
            statusCode: 500,
            message: 'Error interno del servidor',
            error: 'Internal Server Error',
            },
        },
    })
    async getAll(): Promise<AllCondicionIvaDto[]> {
        return this.condicionIvaService.getAll();
    }

    @Post()
    @ApiOperation({ summary: 'Crear una condicion de IVA' })
    @ApiBody({ type: CreateCondicionIvaDto })
    @ApiResponse({ status: 201, description: 'Condicion de IVA creada correctamente', type: AllCondicionIvaDto })
    @ApiResponse({ status: 400, description: 'Error al crear la condicion de IVA',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al crear la condicion de IVA',
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
    async insert(@Body() data: CreateCondicionIvaDto): Promise<number> {
        return this.condicionIvaService.insert(data);
    }

    @Post('bulk')
    @ApiOperation({ summary: 'Crear varias condiciones de IVA' })
    @ApiBody({ type: [CreateCondicionIvaDto] })
    @ApiResponse({ status: 201, description: 'Condiciones de IVA creadas correctamente', type: String })
    @ApiResponse({ status: 400, description: 'Error al crear las condiciones de IVA',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al crear las condiciones de IVA',
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
    async bulkInsert(@Body() data: CreateCondicionIvaDto[]): Promise<string> {
        return this.condicionIvaService.bulkInsert(data);
    }
}
