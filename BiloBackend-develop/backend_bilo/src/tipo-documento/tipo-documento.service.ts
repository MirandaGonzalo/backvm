import { Injectable } from '@nestjs/common';
import { TipoDocumento } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento';

@Injectable()
export class TipoDocumentoService {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async findAll(): Promise<TipoDocumento[]> {
        return this.prisma.tipoDocumento.findMany();
    }

    async validar(id: number): Promise<boolean> {
        const tipoDocumento = await this.prisma.tipoDocumento.findUnique({
            where: {
                id
            }
        });

        return !!tipoDocumento;
    }

    async insert(data: CreateTipoDocumentoDto): Promise<number> {
        await this.validarUniques(data);

        const tipoDocumento = await this.prisma.tipoDocumento.create({ data });
        return tipoDocumento.id;
    }

    async bulkInsert(data: CreateTipoDocumentoDto[]): Promise<string> {
        const transaction = this.prisma;

        await Promise.all(data.map(async (item) => {
            await this.validarUniques(item);
        }));

        await transaction.$transaction([
            transaction.tipoDocumento.createMany({ data })
        ]);
        
        return 'Tipos de documento insertados correctamente';
    }

    private async validarUniques(data: CreateTipoDocumentoDto): Promise<void> {
        const tipoDocumento = await this.prisma.tipoDocumento.findUnique({
            where: {
                nombre: data.nombre
            }
        });

        if (tipoDocumento) {
            throw new Error('El tipo de documento ya existe');
        }
    }

}
