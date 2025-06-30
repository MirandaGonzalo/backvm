import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/loginUserDto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Public } from 'src/shared/decorators/public.decorator';
import { ResponseUserDto } from 'src/usuario/dto/responseUserDto';
import { Request } from 'express';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginResponseDto } from './dto/loginResponseDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usuarioService: UsuarioService,
    ) { }

    @Post('login')
    @Public()
    @ApiOperation({ summary: 'Iniciar sesión' })
    @ApiResponse({ status: 201, description: 'Login exitoso', type: LoginResponseDto })
    @ApiResponse({ status: 400, description: 'Credenciales incorrectas' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async create(@Body() loginDto: LoginUserDto, @Res() res: Response) {
        const response = await this.authService.login(loginDto);

        res.cookie('token', response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: response.expirationTime,
            sameSite: 'strict'
        });

        return res.status(201).json({
            message: 'Login exitoso',
            isAuthenticated: true,
            expirationTime: response.expirationTime
        });
    }

    @Post('logout')
    @ApiOperation({ summary: 'Cerrar sesión' })
    @ApiResponse({ status: 200, description: 'Sesión cerrada' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    logout(@Res({ passthrough: true }) res: Response): { message: string } {
        res.clearCookie('token', {
            path: '/',
        });
        return { message: 'Sesión cerrada' };
    }

    @Get('me')
    @ApiOperation({ summary: 'Obtener información del usuario autenticado' })
    @ApiResponse({ status: 200, description: 'Usuario autenticado', type: ResponseUserDto })
    @ApiResponse({ status: 401, description: 'No autenticado' })
    @ApiResponse({ status: 500, description: 'Error interno del servidor' })
    async authMe(@Req() req: Request): Promise<ResponseUserDto> {
        const usuario = await this.usuarioService.findOne(req.params.id_usuario);
        return usuario ;
    }
}
