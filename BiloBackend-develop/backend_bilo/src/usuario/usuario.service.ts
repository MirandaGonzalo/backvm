import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-user-dto';
import { UpdateUsuarioDto } from './dto/update-user-dto';
import { UtilsService } from 'src/shared/utils/utils.service';
import { LoginUserDto } from './dto/loginUserDto';
import { ContraseñaUtils } from 'src/shared/utils/contraseña.util';
import { ResponseUserDto } from './dto/responseUserDto';

@Injectable()
export class UsuarioService {
    constructor(
        private readonly prisma: PrismaService
    ) { }
    findAll() {
        return this.prisma.usuario.findMany({
            select: {
                email: true,
                nombre_usuario: true
            }
        });
    }

    async create(data: CreateUsuarioDto): Promise<ResponseUserDto> {
        data.contraseña = await ContraseñaUtils.hashearContraseña(data.contraseña);
        const nuevoUsuario = await this.prisma.usuario.create({
            data
        });
        return nuevoUsuario;
    }

    async findOne(id: string): Promise<ResponseUserDto> {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                id: Number(id)
            }
        })

        if (!usuario) {
            throw new NotFoundException(`Usuario con id ${id} no encontrado`);
        }

        usuario.contraseña = undefined;
        return usuario;
    }

    async findOneByNombreUsuario(nombre_usuario: string): Promise<LoginUserDto> {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                nombre_usuario: nombre_usuario
            }
        })

        if (!usuario) {
            return null;
        }

        return usuario;
    }

    async updateUser(id: number, data: UpdateUsuarioDto): Promise<{ actualizado: boolean }> {
        const usuario = await this.prisma.usuario.findUnique({
            where: {
                id
            },
            select: {
                nombre_usuario: true,
                email: true,
                contraseña: true,
            }
        });

        if (!usuario) {
            throw new NotFoundException(`El usuario con id ${id} no existe.`)
        }

        const hayCambios = UtilsService.hayCambios(usuario, data);
        
        if (!hayCambios)
            return {
                actualizado: false
            }

        await this.prisma.usuario.update({
            where: {
                id
            },
            data
        });
        return { actualizado: true }
    }
}

