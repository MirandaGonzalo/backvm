import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDireccionDto } from './dto/create-direccion';
import { PrismaClient } from '@prisma/client';
import { ProvinciaService } from 'src/provincia/provincia.service';
import { LocalidadService } from 'src/localidad/localidad.service';
import { UpdateDireccionDto } from './dto/update-direccion.dto';

@Injectable()
export class DireccionService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly provinciaService: ProvinciaService,
        private readonly localidadService: LocalidadService,
    ) { }

    async insert(data: CreateDireccionDto, tx?: PrismaClient): Promise<number> {
        const transaction = tx ? tx : this.prisma;       
        
        const provincia = await this.provinciaService.validar(data.idProvincia);
        if (!provincia) {
            throw new NotFoundException('No existe la Provincia seleccionada');
        }

        const localidad = await this.localidadService.validar(data.idLocalidad, data.idProvincia);
        if (!localidad) {
            throw new NotFoundException('No existe la Localidad seleccionada');
        }

        const direccion = await transaction.direccion.create({ data });
        return direccion.id;
    }

    async update(id: number, data: UpdateDireccionDto, tx?: PrismaClient): Promise<number> {
        const transaction = tx ? tx : this.prisma;

        if (data.idProvincia) {
            const provincia = await this.provinciaService.validar(data.idProvincia);
            if (!provincia) {
                throw new NotFoundException('No existe la Provincia seleccionada');
            }
        }

        if (data.idLocalidad) {
            if (!data.idProvincia) {
                data.idProvincia = await this.buscarProvinciaPorLocalidad(data.idLocalidad, transaction);
            }

            const localidad = await this.localidadService.validar(data.idLocalidad, data.idProvincia);
            if (!localidad) {
                throw new NotFoundException('No existe la Localidad seleccionada');
            }
        }

        const direccion = await transaction.direccion.update({
            where: {
                id: id
            },
            data: data
        });
        return direccion.id;
    }

    private async buscarProvinciaPorLocalidad(idLocalidad: number, tx?: PrismaClient) {
        try {
            const transaction = tx ? tx : this.prisma;
            const localidad = await transaction.localidad.findUnique({
                where: {
                    id: idLocalidad
                }
            });

            if (!localidad) {
                throw new NotFoundException('No existe la Localidad seleccionada');
            }
            
            return localidad.idProvincia;
        } catch (error) {
            throw error;
        }
    }
    
}
