import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllCondicionIvaDto } from './dto/all-condicion-iva';
import { CreateCondicionIvaDto } from './dto/create-condicion-iva';

@Injectable()
export class CondicionIvaService {

    constructor(
        private readonly prisma: PrismaService
    ) { }

    async validar(id: number): Promise<boolean>{
        try {
            const condicionIva = await this.prisma.condicionIva.findUnique({
                where: {
                    id
                }
            });

            return !!condicionIva;
        } catch (e) {
            throw e;
        }
    }

    async getAll(): Promise<AllCondicionIvaDto[]> {
        try {
            const condicionIva = await this.prisma.condicionIva.findMany();
            return condicionIva;
        } catch (e) {
            throw e;
        }
    }

    async insert(data: CreateCondicionIvaDto): Promise<number> {
        const transaction = this.prisma;

        await this.validarUniques(data);

        const condicionIva = await transaction.condicionIva.create({ data });
        return condicionIva.id;
    }

    async bulkInsert(data: CreateCondicionIvaDto[]): Promise<string> {
        const transaction = this.prisma;

        await Promise.all(data.map(async (item) => {
            await this.validarUniques(item);
        }));

        await transaction.$transaction([
            transaction.condicionIva.createMany({ data })
        ]);
        
        return 'Condiciones IVA insertadas correctamente';
    }

    private async validarUniques(data: CreateCondicionIvaDto): Promise<void> {
        const condicionIva = await this.prisma.condicionIva.findUnique({
            where: {
                nombre: data.nombre
            }
        });

        if (condicionIva) {
            throw new Error('La condicion IVA ya existe');
        }
    }
    
}
