import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { UpdateEmpresaConfigDto } from './dto/update-empresa-config.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UpdateContabilidadConfigDto } from './dto/update-contabilidad-config.dto';

@ApiTags('Configuración')
@Controller('configuracion')
export class ConfiguracionController {
    constructor(
        private readonly configuracionService: ConfiguracionService
    ) {}

    //EMPRESA
    @Get('empresa')
    @ApiOperation({ summary: 'Obtener la configuración de la empresa' })
    @ApiResponse({ 
        status: 200, 
        description: 'Configuración de la empresa', 
        type: UpdateEmpresaConfigDto 
    })
    async getEmpresaConfig() {
        return this.configuracionService.getEmpresaConfig();
    }

    @Put('empresa')
    @ApiOperation({ summary: 'Actualizar la configuración de la empresa' })
    @ApiBody({ type: UpdateEmpresaConfigDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Configuración de la empresa actualizada', 
        type: UpdateEmpresaConfigDto 
    })
    @ApiResponse({ status: 400, description: 'Error al actualizar la configuración de la empresa',
        schema: {
            example: {
                statusCode: 400,
                message: 'Error al actualizar la configuración de la empresa',
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
    async updateEmpresaConfig(@Body() data: UpdateEmpresaConfigDto) {
        return this.configuracionService.setEmpresaConfig(data);
    }

    //CONTABILIDAD
    @Get('contabilidad')
    @ApiOperation({ summary: 'Obtener la configuración de la contabilidad' })
    @ApiResponse({ 
        status: 200, 
        description: 'Configuración de la contabilidad', 
        type: UpdateContabilidadConfigDto 
    })
    async getContabilidadConfig() {
        return this.configuracionService.getContabilidadConfig();
    }

    @Put('contabilidad')
    @ApiOperation({ summary: 'Actualizar la configuración de la contabilidad' })
    @ApiBody({ type: UpdateContabilidadConfigDto })
    @ApiResponse({ 
        status: 200, 
        description: 'Configuración de la contabilidad actualizada', 
        type: UpdateContabilidadConfigDto 
    })
    @ApiResponse({ status: 400, description: 'Error al actualizar la configuración de la contabilidad',
        schema: {
            example: {
                statusCode: 400,
                message: 'Error al actualizar la configuración de la contabilidad',
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
    async updateContabilidadConfig(@Body() data: UpdateContabilidadConfigDto) {
        return this.configuracionService.setContabilidadConfig(data);
    }
    
}