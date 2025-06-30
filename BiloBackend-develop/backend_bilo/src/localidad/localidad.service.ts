import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AllLocalidadDto } from './dto/all-localidad';
import { CreateLocalidadDto } from './dto/create-localidad';
import { ProvinciaService } from 'src/provincia/provincia.service';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class LocalidadService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly provinciaService: ProvinciaService
    ) { }

    async validar(id: number, idProvincia: number): Promise<boolean>{
        try {
            const localidad = await this.prisma.localidad.findUnique({
                where: {
                    id,
                    provincia: {
                        id: idProvincia
                    }
                }
            });

            return !!localidad;
        } catch (e) {
            throw e;
        }
    }

    async getAll(): Promise<AllLocalidadDto[]> {
        try {
            const localidades = await this.prisma.localidad.findMany();
            return localidades;
        } catch (e) {
            throw e;
        }
    }

    async getAllByProvincia(idProvincia: number): Promise<AllLocalidadDto[]> {
        try {
            const localidades = await this.prisma.localidad.findMany({
                where: {
                    provincia: {
                        id: idProvincia
                    }
                }
            });
            return localidades;
        } catch (e) {
            throw e;
        }
    }

    async insert(data: CreateLocalidadDto): Promise<number> {
        const transaction = this.prisma;

        const provincia = await this.provinciaService.validar(data.idProvincia);
        if (!provincia) {
            throw new NotFoundException('No existe la Provincia seleccionada');
        }

        await this.validarUniques(data);

        const localidad = await transaction.localidad.create({ data });
        return localidad.id;
    }

    async bulkInsert2(data: CreateLocalidadDto[]): Promise<string> {
        const transaction = this.prisma;

        await Promise.all(data.map(async (item) => {
            await this.validarUniques(item);
            const provincia = await this.provinciaService.validar(item.idProvincia);
            if (!provincia) {
                throw new NotFoundException('No existe la Provincia seleccionada');
            }
        }));

        await transaction.$transaction([
            transaction.localidad.createMany({ data })
        ]);
        
        return 'Localidades insertadas correctamente';
    }

    async bulkInsert(data: CreateLocalidadDto[]): Promise<string> {
        const transaction = this.prisma;
    
        // Paso 1: Eliminar duplicados dentro del array `data`
        const dataUnica = this.eliminarDuplicadosEnArray(data);
    
        // Paso 2: Verificar que no existan en la BD
        await this.validarUniquesEnLote(dataUnica);
    
        // Paso 3: Insertar
        await transaction.$transaction([
            transaction.localidad.createMany({ data: dataUnica })
        ]);
        
        return `Se insertaron ${dataUnica.length} localidades correctamente`;
    }
    

    private async validarUniques(data: CreateLocalidadDto): Promise<void> {
        const localidad = await this.prisma.localidad.findUnique({
            where: {
                idProvincia_nombre: {
                    idProvincia: data.idProvincia,
                    nombre: data.nombre
                }
            }
        });

        if (localidad) {
            throw new Error('La localidad ya existe para la provincia seleccionada');
        }
    }

    private eliminarDuplicadosEnArray(data: CreateLocalidadDto[]): CreateLocalidadDto[] {
        const seen = new Set<string>();
        return data.filter(loc => {
            const key = `${loc.idProvincia}_${loc.nombre.toLowerCase().trim()}`;
            if (!seen.has(key)) {
                seen.add(key);
                return true;
            }
            console.warn(`Duplicado en lote omitido: ${loc.nombre} (Provincia ${loc.idProvincia})`);
            return false;
        });
    }

    private async validarUniquesEnLote(data: CreateLocalidadDto[]): Promise<void> {
        const condiciones = data.map(loc => ({
            idProvincia: loc.idProvincia,
            nombre: loc.nombre
        }));
    
        const existentes = await this.prisma.localidad.findMany({
            where: { OR: condiciones }
        });
    
        if (existentes.length > 0) {
            throw new Error(`Las siguientes localidades ya existen: ${
                existentes.map(e => `${e.nombre} (Provincia ${e.idProvincia})`).join(', ')
            }`);
        }
    }

}
