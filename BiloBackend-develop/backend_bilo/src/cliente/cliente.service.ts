import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from 'src/shared/utils/utils.service';
import { ClienteResponseDto } from './dto/cliente-response.dto';
import { ClienteDetailDto } from './dto/detail-cliente.dto';
import { CreateClienteDto } from './dto/create-cliente-dto';
import { DireccionService } from 'src/direccion/direccion.service';
import { PrismaClient } from '@prisma/client';
import { CondicionIvaService } from 'src/condicion-iva/condicion-iva.service';
import { TipoDocumentoService } from 'src/tipo-documento/tipo-documento.service';
import { ValidacionUtils } from 'src/shared/utils/validacion.util';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClienteService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly direccionService: DireccionService,
        private readonly condicionIvaService: CondicionIvaService,
        private readonly tipoDocumentoService: TipoDocumentoService,
        private readonly validacionUtil: ValidacionUtils
    ) { }

    async findAll(): Promise<ClienteResponseDto[]> {
        const clientes = await this.prisma.cliente.findMany({
            select: {
                id: true,
                codigo: true,
                nombre: true,
                apellido: true,
                tipoDocumento: true,
                dni: true,
                telefono: true,
                email: true,
                estado: true,
                cuit: true
            },
        })

        return clientes.map(cliente => new ClienteResponseDto(cliente));
    }

    async findOne(idCliente: number, tx?: PrismaClient): Promise<ClienteDetailDto> {
        this.validacionUtil.validarId(idCliente);
        const transaction = tx ? tx : this.prisma;
        const cliente = await transaction.cliente.findUnique({
            where: {
                id: idCliente
            },
            include: {
                direccion: {
                    include: {
                        provincia: true,
                        localidad: true
                    }
                },
                tipoDocumento: true,
                condicionIva: true
            }

        })

        if (!cliente) {
            throw new NotFoundException(`Usuario con id ${idCliente} no encontrado`);
        }

        const detalleCliente = new ClienteDetailDto(cliente);
        return detalleCliente;
    }

    async changeStatus(idCliente: number): Promise<{ message: string }> {
        this.validacionUtil.validarId(idCliente);
        const cliente = await this.findOne(idCliente);

        if (!cliente) {
            throw new NotFoundException(`Usuario con id ${idCliente} no encontrado`);
        }

        const nuevoEstado = !cliente.estado;
        await this.prisma.cliente.update({
            where: { id: idCliente },
            data: { estado: nuevoEstado },
        });
        const estadoTexto = nuevoEstado ? 'Activo' : 'Inactivo';
        return {
            message: `El cliente ${cliente.nombre} ahora tiene el estado ${estadoTexto}`,
        };
    }

    async insert(createClienteDto: CreateClienteDto): Promise<ClienteDetailDto> {
        try {

            const existeCondicionIva = await this.condicionIvaService.validar(createClienteDto.idCondicionIva);
            if (!existeCondicionIva) {
                throw new NotFoundException('No existe la Condicion IVA seleccionada');
            }

            const existeTipoDocumento = await this.tipoDocumentoService.validar(createClienteDto.idTipoDocumento);
            if (!existeTipoDocumento) {
                throw new NotFoundException('No existe el Tipo Documento seleccionado');
            }

            await this.validarUniques(createClienteDto);

            const cliente = await this.prisma.$transaction(async (tx) => {

                const idDireccion = await this.direccionService.insert(
                    createClienteDto.direccion,
                    tx as PrismaClient
                );

                const cliente = await tx.cliente.create({
                    data: {
                        nombre: createClienteDto.nombre,
                        apellido: createClienteDto.apellido,
                        tipoDocumento: {
                            connect: {
                                id: createClienteDto.idTipoDocumento
                            }
                        },
                        condicionIva: {
                            connect: {
                                id: createClienteDto.idCondicionIva
                            }
                        },
                        dni: createClienteDto.dni,
                        cuit: createClienteDto.cuit,
                        codigo: createClienteDto.codigo,
                        telefono: createClienteDto.telefono,
                        email: createClienteDto.email,
                        habilitaCtacte: createClienteDto.habilitaCtacte,
                        direccion: {
                            connect: {
                                id: idDireccion
                            }
                        }
                    }
                });

                const nuevoCliente = await this.findOne(cliente.id, tx as PrismaClient);

                if (!nuevoCliente) {
                    throw new Error('No se pudo crear el cliente');
                }

                return nuevoCliente;

            }, {
                timeout: 100000
            });

            const nuevoClienteDTO = new ClienteDetailDto(cliente);

            return nuevoClienteDTO;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new Error(error);
        }
    }

    async update(idCliente: number, updateClienteDto: UpdateClienteDto): Promise<ClienteDetailDto> {
        try {
            this.validacionUtil.validarId(idCliente);
            const cliente = await this.findOnePlain(idCliente);

            if (!cliente) {
                throw new NotFoundException(`Usuario con id ${idCliente} no encontrado`);
            }

            const updateDireccion = updateClienteDto.direccion;
            delete updateClienteDto.direccion;

            const hayCambiosCliente = UtilsService.hayCambios(cliente, updateClienteDto);
            const hayCambiosDireccion = UtilsService.hayCambios(cliente.direccion, updateDireccion);

            if (!hayCambiosCliente && !hayCambiosDireccion) {
                throw new HttpException('No hay cambios para actualizar', 400);
            }

            updateClienteDto.id = idCliente;
            await this.validarUniques(updateClienteDto);

            if (updateClienteDto.idCondicionIva != undefined) {
                const existeCondicionIva = await this.condicionIvaService.validar(updateClienteDto.idCondicionIva);
                if (!existeCondicionIva) {
                    throw new NotFoundException('No existe la Condicion IVA seleccionada');
                }
            }

            if (updateClienteDto.idTipoDocumento != undefined) {
                const existeTipoDocumento = await this.tipoDocumentoService.validar(updateClienteDto.idTipoDocumento);
                if (!existeTipoDocumento) {
                    throw new NotFoundException('No existe el Tipo Documento seleccionado');
                }
            }

            const clienteActualizado = await this.prisma.$transaction(async (tx) => {
                if (hayCambiosCliente) {
                    await tx.cliente.update({
                        where: {
                            id: cliente.id
                        },
                        data: {
                            nombre: updateClienteDto.nombre,
                            apellido: updateClienteDto.apellido,
                            idTipoDocumento: updateClienteDto.idTipoDocumento,
                            idCondicionIva: updateClienteDto.idCondicionIva,
                            dni: updateClienteDto.dni,
                            cuit: updateClienteDto.cuit,
                            codigo: updateClienteDto.codigo,
                            telefono: updateClienteDto.telefono,
                            email: updateClienteDto.email,
                            habilitaCtacte: updateClienteDto.habilitaCtacte,
                        }
                    });
                }

                if (hayCambiosDireccion) {
                    await this.direccionService.update(cliente.direccion.id, updateDireccion);
                }

                const clienteActualizado = await this.findOne(cliente.id, tx as PrismaClient);

                return clienteActualizado;
            }, {
                timeout: 100000
            });

            return clienteActualizado;
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            throw new Error(error);
        }
    }

    private async validarUniques(data: CreateClienteDto | UpdateClienteDto): Promise<void> {
        try {
            const campos = ['codigo', 'cuit', 'dni'];
            const errores: string[] = [];

            for (const campo of campos) {
                if (data[campo] === undefined) {
                    continue;
                }
                let id = null;
                if (data instanceof UpdateClienteDto) {
                    id = data.id;
                }
                const existe = await this.validacionUtil.validarExistentesPorCampo('cliente', campo, data[campo], id);
                if (existe) {
                    errores.push(`Ya existe un cliente con el ${campo} ingresado`);
                }
            }

            if (errores.length > 0) {
                throw new HttpException(errores.join(', '), 400);
            }

        } catch (error) {
            throw error;
        }
    }

    private async findOnePlain(idCliente: number): Promise<UpdateClienteDto> {
        this.validacionUtil.validarId(idCliente);
        const cliente = await this.prisma.cliente.findUnique({
            where: {
                id: idCliente
            },
            select: {
                id: true,
                codigo: true,
                cuit: true,
                idTipoDocumento: true,
                dni: true,
                nombre: true,
                apellido: true,
                idCondicionIva: true,
                telefono: true,
                email: true,
                habilitaCtacte: true,
                idDireccion: true,
                estado: true,
                direccion: {
                    select: {
                        id: true,
                        calle: true,
                        numeroCalle: true,
                        piso: true,
                        barrio: true,
                        departamento: true,
                        idLocalidad: true,
                        idProvincia: true
                    }
                }
            }
        })

        if (!cliente) {
            throw new NotFoundException(`Usuario con id ${idCliente} no encontrado`);
        }

        const detalleCliente = new UpdateClienteDto();
        detalleCliente.id = Number(cliente.id);
        detalleCliente.dni = cliente.dni;
        detalleCliente.nombre = cliente.nombre;
        detalleCliente.apellido = cliente.apellido;
        detalleCliente.codigo = cliente.codigo;
        detalleCliente.cuit = cliente.cuit;
        detalleCliente.idCondicionIva = Number(cliente.idCondicionIva);
        detalleCliente.idTipoDocumento = Number(cliente.idTipoDocumento);
        detalleCliente.telefono = cliente.telefono;
        detalleCliente.email = cliente.email;
        detalleCliente.habilitaCtacte = cliente.habilitaCtacte;
        detalleCliente.direccion = {
            id: Number(cliente.direccion.id),
            idLocalidad: Number(cliente.direccion.idLocalidad),
            idProvincia: Number(cliente.direccion.idProvincia),
            barrio: cliente.direccion.barrio,
            calle: cliente.direccion.calle,
            numeroCalle: cliente.direccion.numeroCalle,
            piso: cliente.direccion.piso,
            departamento: cliente.direccion.departamento
        }
        return detalleCliente;
    }

}