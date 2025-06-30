import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEmpresaConfigDto } from './dto/update-empresa-config.dto';
import { UtilsService } from 'src/shared/utils/utils.service';
import { PrismaClient } from '@prisma/client';
import { DireccionService } from 'src/direccion/direccion.service';
import { CreateDireccionDto } from 'src/direccion/dto/create-direccion';
import { ResponseEmpresaConfigDto } from './dto/response-empresa-config.dto';
import { UpdateContabilidadConfigDto } from './dto/update-contabilidad-config.dto';
import { ResponseContabilidadConfigDto } from './dto/response-contabilidad-config.dto';
import { CondicionIvaService } from 'src/condicion-iva/condicion-iva.service';

@Injectable()
export class ConfiguracionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly direccionService: DireccionService,
        private readonly condicionIvaService: CondicionIvaService
    ) { }

    // EMPRESA
    async getEmpresaConfig() {
        try {
            const empresaConfig = await this.prisma.empresaConfig.findFirst({
                include: {
                    direccion: {
                        include: {
                            provincia: true,
                            localidad: true
                        }
                    }
                }
            });
            return new ResponseEmpresaConfigDto(empresaConfig);
        } catch (error) {
            throw error;
        }
    }

    async setEmpresaConfig(data: UpdateEmpresaConfigDto): Promise<ResponseEmpresaConfigDto> {
        try {
            let empresaConfig = await this.getEmpresaConfigPlain();

            await this.prisma.$transaction(async (tx) => {
                if (!empresaConfig) {
                    await this.initializeEmpresaConfig(tx as PrismaClient);
                    empresaConfig = await this.getEmpresaConfigPlain(tx as PrismaClient);
                }

                await this.updateEmpresaConfig(empresaConfig, data, tx as PrismaClient);
            }, {
                timeout: 10000
            });

            const empresaConfigUpdated = await this.getEmpresaConfig();
            return empresaConfigUpdated;
        } catch (error) {
            throw error;
        }
    }

    async initializeEmpresaConfig(tx: PrismaClient) {
        try {
            const localidad = await this.prisma.localidad.findFirst({});
            const direccion = new CreateDireccionDto({
                idLocalidad: localidad.id,
                idProvincia: localidad.idProvincia,
                barrio: '',
                calle: '',
                numeroCalle: '',
                piso: '',
                departamento: ''
            });

            let direccionId: number;
            if (direccion) {
               direccionId = await this.direccionService.insert(direccion, tx as PrismaClient);
            }

            await tx.empresaConfig.create({
                data: {
                    razonSocial: '',
                    cuit: '',
                    telefono: '',
                    email: '',
                    direccion: {
                        connect: {
                            id: direccionId
                        }
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async updateEmpresaConfig(actualEmpresaConfig: UpdateEmpresaConfigDto, updateEmpresaConfigDto: UpdateEmpresaConfigDto, tx: PrismaClient) {
        try {
            const updateDireccion = updateEmpresaConfigDto.direccion;
            delete updateEmpresaConfigDto.direccion;

            const hayCambiosEmpresaConfig = UtilsService.hayCambios(actualEmpresaConfig, updateEmpresaConfigDto);
            const hayCambiosDireccion = UtilsService.hayCambios(actualEmpresaConfig.direccion, updateDireccion);

            if (hayCambiosEmpresaConfig) {
                await tx.empresaConfig.update({
                    where: {
                        id: actualEmpresaConfig.id
                    },
                    data: {
                        razonSocial: updateEmpresaConfigDto.razonSocial,
                        cuit: updateEmpresaConfigDto.cuit,
                        telefono: updateEmpresaConfigDto.telefono,
                        email: updateEmpresaConfigDto.email
                    }
                });
            }

            if (hayCambiosDireccion) {
                await this.direccionService.update(actualEmpresaConfig.direccion.id, updateDireccion, tx as PrismaClient);
            }
        } catch (error) {
            throw error;
        }
    }

    private async getEmpresaConfigPlain(tx?: PrismaClient) {
        try {
            const transaction = tx ? tx : this.prisma;
            const empresaConfig = await transaction.empresaConfig.findFirst({
                include: {
                    direccion: true
                }
            });

            if (!empresaConfig) {
                return null;
            }

            const empresaConfigDTO = new UpdateEmpresaConfigDto();
            empresaConfigDTO.id = Number(empresaConfig.id);
            empresaConfigDTO.razonSocial = empresaConfig.razonSocial;
            empresaConfigDTO.cuit = empresaConfig.cuit;
            empresaConfigDTO.telefono = empresaConfig.telefono;
            empresaConfigDTO.email = empresaConfig.email;
            empresaConfigDTO.direccion = {
                id: Number(empresaConfig.direccion.id),
                idLocalidad: Number(empresaConfig.direccion.idLocalidad),
                idProvincia: Number(empresaConfig.direccion.idProvincia),
                barrio: empresaConfig.direccion.barrio,
                calle: empresaConfig.direccion.calle,
                numeroCalle: empresaConfig.direccion.numeroCalle,
                piso: empresaConfig.direccion.piso,
                departamento: empresaConfig.direccion.departamento
            }

            return empresaConfigDTO;
        } catch (error) {
            throw error;
        }
    }

    // CONTABILIDAD
    async getContabilidadConfig() {
        try {
            const contabilidadConfig = await this.prisma.contabilidadConfig.findFirst({
                include: {
                    condicionIva: true
                }
            });
            return new ResponseContabilidadConfigDto(contabilidadConfig);
        } catch (error) {
            throw error;
        }
    }

    async setContabilidadConfig(data: UpdateContabilidadConfigDto): Promise<any> {
        try {
            let contabilidadConfig = await this.getContabilidadConfigPlain();

            await this.prisma.$transaction(async (tx) => {
                if (!contabilidadConfig) {
                    await this.initializeContabilidadConfig(tx as PrismaClient);
                    contabilidadConfig = await this.getContabilidadConfigPlain(tx as PrismaClient);
                }

                await this.updateContabilidadConfig(contabilidadConfig, data, tx as PrismaClient);
            });

            const contabilidadConfigUpdated = await this.getContabilidadConfig();
            return contabilidadConfigUpdated;
        } catch (error) {
            throw error;
        }
    }

    async initializeContabilidadConfig(tx: PrismaClient) {

        const condicionIva = await this.prisma.condicionIva.findFirst();
        try {
            await tx.contabilidadConfig.create({
                data: {
                    puntoDeVenta: 0,
                    condicionIva: {
                        connect: {
                            id: condicionIva.id
                        }
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    }

    async updateContabilidadConfig(actualContabilidadConfig: UpdateContabilidadConfigDto, updateContabilidadConfigDto: UpdateContabilidadConfigDto, tx: PrismaClient) {
        try {
            if (updateContabilidadConfigDto.idCondicionIva) {
                const existeCondicionIva = await this.condicionIvaService.validar(updateContabilidadConfigDto.idCondicionIva);

                if (!existeCondicionIva) {
                    throw new BadRequestException('No existe la Condición IVA seleccionada');
                }
            }

            await tx.contabilidadConfig.update({
                where: {
                    id: actualContabilidadConfig.id
                },
                data: {
                    puntoDeVenta: updateContabilidadConfigDto.puntoDeVenta,
                    condicionIva: {
                        connect: {
                            id: updateContabilidadConfigDto.idCondicionIva
                        }
                    }
                }
            });
        } catch (error) {
            throw error;
        }
    }

    private async getContabilidadConfigPlain(tx?: PrismaClient) {
        try {
            const transaction = tx ? tx : this.prisma;
            const contabilidadConfig = await transaction.contabilidadConfig.findFirst();

            if (!contabilidadConfig) {
                return null;
            }

            const contabilidadConfigDTO = new UpdateContabilidadConfigDto();
            contabilidadConfigDTO.id = Number(contabilidadConfig.id);
            contabilidadConfigDTO.idCondicionIva = Number(contabilidadConfig.idCondicionIva);
            contabilidadConfigDTO.puntoDeVenta = Number(contabilidadConfig.puntoDeVenta);

            return contabilidadConfigDTO;
        } catch (error) {
            throw error;
        }
    }

}