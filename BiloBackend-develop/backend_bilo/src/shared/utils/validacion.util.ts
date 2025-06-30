import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ValidacionUtils {
    constructor(private readonly prisma: PrismaService) { }

    async validarExistentesPorCampo(modelo: string, campo: string, valor: string, id?: number): Promise<boolean> {
        try {
            let where: any = {
                [campo]: valor,
            }
            if (id){
                where = {
                    ...where,
                    id: {
                        not: id
                    }
                }
            }
            const clientes = await this.prisma[modelo].findMany({
                where
            })
    
            return clientes.length > 0;
        } catch (error) {
            throw error;
        }
    }

    validarId(id: number): boolean {
        if (isNaN(id)) {
            throw new BadRequestException('El ID debe ser un número');
        }
        return true;
    }
}