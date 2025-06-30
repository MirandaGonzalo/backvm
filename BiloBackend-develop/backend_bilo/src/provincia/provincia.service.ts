import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllProvinciaDto } from './dto/all-provincia';
import { CreateProvinciaDto } from './dto/create-provincia';
import { CreateBulkProvinciaDto } from './dto/create-bulk-provincia';

@Injectable()
export class ProvinciaService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async validar(id: number): Promise<boolean>{
        try {
            const provincia = await this.prisma.provincia.findUnique({
                where: {
                    id
                }
            });

            return !!provincia;
        } catch (e) {
            throw e;
        }
    }

    async getAll(): Promise<AllProvinciaDto[]> {
        try {
            const provincias = await this.prisma.provincia.findMany();
            return provincias;
        } catch (e) {
            throw e;
        }
    }

    async insert(data: CreateProvinciaDto): Promise<number> {
        const transaction = this.prisma;

        await this.validarUniques(data);

        const provincia = await transaction.provincia.create({ data });
        return provincia.id;
    }

    async bulkInsert(data: CreateBulkProvinciaDto[]): Promise<string> {
        const transaction = this.prisma;

        await Promise.all(data.map(async (item) => {
            await this.validarUniques(item);
        }));

        await transaction.$transaction([
            transaction.provincia.createMany({ data })
        ]);
        
        return 'Provincias insertadas correctamente';
    }

    private async validarUniques(data: CreateProvinciaDto | CreateBulkProvinciaDto): Promise<void> {
        const provincia = await this.prisma.provincia.findUnique({
            where: {
                nombre: data.nombre
            }
        });

        if (provincia) {
            throw new Error('La provincia ya existe');
        }
    }

}
