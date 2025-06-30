import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginUserDto } from './dto/loginUserDto';
import { ContraseñaUtils } from 'src/shared/utils/contraseña.util';
import validator from 'validator';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDto';

@Injectable()
export class AuthService {
    prisma: any;

    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginUserDto): Promise<LoginDto> {
        try{
            const usuario = await this.validarUsuario(loginDto.nombre_usuario, loginDto.contraseña);
    
            const payload = {
                id: usuario.id,
                nombre_usuario: usuario.nombre_usuario
            };

            const expirationTime = 
                (process.env.EXPIRATION_TIME? Number(process.env.EXPIRATION_TIME): 24) * 60 * 60 * 1000;

            const token = this.jwtService.sign(payload);

            const response: LoginDto = {
                token: token,
                expirationTime: expirationTime
            };

            return response;

        } catch (error) {
            throw error;
        }
        
    }

    async validarUsuario(nombre_usuario: string, contraseña: string) {
        try {
            nombre_usuario = validator.escape(nombre_usuario);

        const usuario = await this.usuarioService.findOneByNombreUsuario(nombre_usuario);
        
        if (!usuario) {
            throw new UnauthorizedException(`Usuario o contraseña incorrecto/s.`);
        }
    
        const validacion = 
            await ContraseñaUtils.compararContraseña(usuario.contraseña, contraseña);
        
        if (!validacion) {
            throw new UnauthorizedException(`Usuario o contraseña incorrecto/s.`);
        }

        usuario.contraseña = undefined;
        return usuario;
        } catch (error) {
            throw error;
        }
    }

}
