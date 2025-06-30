import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { ArticuloResponseDto } from './dto/articulo-response.dto';
import { CreateArticuloDto } from './dto/create-articulo-dto';
import { ValidacionUtils } from 'src/shared/utils/validacion.util';
import { UpdateArticuloDto } from './dto/update-articulo.dto';
import { UtilsService } from 'src/shared/utils/utils.service';

@Injectable()
export class ArticuloService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly validacionUtil: ValidacionUtils        
    ) {}

    async findAll(): Promise<ArticuloResponseDto[]> {
        const articulos = await this.prisma.articulo.findMany();
        return articulos.map(art => new ArticuloResponseDto(art));
    }

    async findOne(id: number, tx?: PrismaClient): Promise<ArticuloResponseDto> {
        this.validacionUtil.validarId(id);
        const transaction = tx ? tx : this.prisma;
        const articulo = await transaction.articulo.findUnique({
            where: {
                id: id
            }
        })

        if (!articulo) {
            throw new NotFoundException(`Artículo con id ${id} no encontrado`);
        }
        return new ArticuloResponseDto(articulo);
    }

    async changeStatus(idArticulo: number): Promise<{ message: string }> {
        this.validacionUtil.validarId(idArticulo);
        const articulo = await this.findOne(idArticulo);

        if (!articulo) {
            throw new NotFoundException(`Artículo con id ${idArticulo} no encontrado`);
        }

        const nuevoEstado = !articulo.estado;
        await this.prisma.articulo.update({
            where: { id: idArticulo },
            data: { estado: nuevoEstado },
        });
        const estadoTexto = nuevoEstado ? 'Activo' : 'Inactivo';
        return {
            message: `El artículo ${articulo.nombre} [${articulo.codigo}] ahora tiene el estado ${estadoTexto}`,
        };
    }

    async insert(createArticuloDto: CreateArticuloDto): Promise<ArticuloResponseDto> {
        try {
            const existeCodigo = await this.prisma.articulo.findFirst({
                where: {
                    codigo: createArticuloDto.codigo
                }
            });
            if (existeCodigo) {
                throw new NotFoundException('Ya existe un Artículo con el código ingresado.');
            }

            const articuloNuevo = await this.prisma.$transaction(async (tx) => {
                const articulo = await tx.articulo.create({
                    data: {
                        codigo: createArticuloDto.codigo,
                        codigo_barra: createArticuloDto.codigo_barra,
                        descripcion: createArticuloDto.descripcion,
                        nombre: createArticuloDto.nombre,
                        produccionPropia: createArticuloDto.produccionPropia,
                        pesable: createArticuloDto.pesable,
                    }
                });
                const nuevoArticulo = await this.findOne(articulo.id, tx as PrismaClient);

                if (!nuevoArticulo) {
                    throw new Error('No se pudo crear el artículo.');
                }
                return nuevoArticulo;
            }, 
            {
                timeout: 100000
            });

            const nuevoArticuloDTO = new ArticuloResponseDto(articuloNuevo);

            return nuevoArticuloDTO;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new Error(error);
        }
    }

    async update(idArticulo: number, updateArticuloDto: UpdateArticuloDto): Promise<ArticuloResponseDto> {
        try {
            this.validacionUtil.validarId(idArticulo);
            const artSel = await this.prisma.articulo.findUnique({
                where: {
                    id: idArticulo
                }
            })

            if (!artSel) {
                throw new NotFoundException(`Artículo con id ${idArticulo} no encontrado`);
            }
            const hayCambiosArticulo = UtilsService.hayCambios(artSel, updateArticuloDto);

            if (!hayCambiosArticulo) {
                throw new HttpException('No hay cambios para actualizar', 400);
            }

            updateArticuloDto.id = idArticulo;
            
            if (updateArticuloDto.codigo !== undefined){
                const codigoUsado = await this.prisma.articulo.findFirst({
                    where: {
                        codigo: updateArticuloDto.codigo,
                        id: {
                            not: idArticulo
                        }
                    }
                })

                //Busco que no intenten repetir el código
                if (codigoUsado){
                    throw new NotFoundException(`No se puede asignar el código de otro artículo.`);
                }
            }

            const articuloActualizado = await this.prisma.$transaction(async (tx) => {
                if (hayCambiosArticulo) {
                    await tx.articulo.update({
                        where: {
                            id: artSel.id
                        },
                        data: {
                            codigo_barra: updateArticuloDto.codigo_barra,
                            codigo: updateArticuloDto.codigo,
                            descripcion: updateArticuloDto.descripcion,
                            nombre: updateArticuloDto.nombre,
                            produccionPropia: updateArticuloDto.produccionPropia,
                            pesable: updateArticuloDto.pesable,
                            estado: updateArticuloDto.estado
                        }
                    });
                }
                const articuloActualizado = await this.findOne(artSel.id, tx as PrismaClient);

                return articuloActualizado;
            }, {
                timeout: 100000
            });

            return articuloActualizado;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new Error(error);
        }
    }
}
