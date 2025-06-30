import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProvinciaService } from './provincia.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AllProvinciaDto } from './dto/all-provincia';
import { CreateProvinciaDto } from './dto/create-provincia';
import { CreateBulkProvinciaDto } from './dto/create-bulk-provincia';

@Controller('provincia')
export class ProvinciaController {

    constructor(
        private readonly provinciaService: ProvinciaService
    ) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Provincias obtenidas correctamente',
        type: [AllProvinciaDto] })
    @ApiResponse({ status: 500, description: 'Error interno del servidor',
        schema: {
            example: {
            statusCode: 500,
            message: 'Error interno del servidor',
            error: 'Internal Server Error',
            },
        },
    })
    async getAll(): Promise<AllProvinciaDto[]> {
        return this.provinciaService.getAll();
    }

    @Post()
    @ApiBody({ type: CreateProvinciaDto })
    @ApiResponse({ status: 201, description: 'Provincia creada correctamente',
        type: AllProvinciaDto })
    @ApiResponse({ status: 400, description: 'Error al crear la provincia',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al crear la provincia',
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
    async insert(@Body() data: CreateProvinciaDto): Promise<number> {
        return this.provinciaService.insert(data);
    }

    @Post('bulk')
    @ApiOperation({ summary: 'Crear varias provincias' })
    @ApiBody({ type: [CreateBulkProvinciaDto] })
    @ApiResponse({ status: 201, description: 'Provincias creadas correctamente', type: String })
    @ApiResponse({ status: 400, description: 'Error al crear las provincias',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al crear las provincias',
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
    async bulkInsert(@Body() data: CreateBulkProvinciaDto[]): Promise<string> {
        return this.provinciaService.bulkInsert(data);
    }
}
