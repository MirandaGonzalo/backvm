import { Controller } from '@nestjs/common';
import { TipoDocumentoService } from './tipo-documento.service';
import { AllTipoDocumentoDto } from './dto/all-tipo-documento';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento';
import { Body, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tipo-documento')
export class TipoDocumentoController {

    constructor(
        private readonly tipoDocumentoService: TipoDocumentoService
    ) { }

    @Get()
    @ApiResponse({ status: 200, description: 'Tipos de documento obtenidos correctamente', type: [AllTipoDocumentoDto] })
    @ApiResponse({ status: 500, description: 'Error al obtener los tipos de documento',
        schema: {
            example: {
            statusCode: 500,
            message: 'Error al obtener los tipos de documento',
            error: 'Internal Server Error',
            },
        },
    })
    async getAll(): Promise<AllTipoDocumentoDto[]> {
        return this.tipoDocumentoService.findAll();
    }

    @Post()
    @ApiBody({ type: CreateTipoDocumentoDto })
    @ApiResponse({ status: 201, description: 'Tipo de documento creado correctamente', type: AllTipoDocumentoDto })
    @ApiResponse({ status: 400, description: 'Error al crear el tipo de documento',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al crear el tipo de documento',
            error: 'Bad Request',
            },
        },
    })
    async insert(@Body() data: CreateTipoDocumentoDto): Promise<number> {
        return this.tipoDocumentoService.insert(data);
    }

    @Post('bulk')
    @ApiOperation({ summary: 'Crear varios tipos de documento' })
    @ApiBody({ type: [CreateTipoDocumentoDto] })
    @ApiResponse({ status: 201, description: 'Tipos de documento creados correctamente', type: String })
    @ApiResponse({ status: 400, description: 'Error al crear los tipos de documento',
        schema: {
            example: {
            statusCode: 400,
            message: 'Error al crear los tipos de documento',
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
    async bulkInsert(@Body() data: CreateTipoDocumentoDto[]): Promise<string> {
        return this.tipoDocumentoService.bulkInsert(data);
    }
}
