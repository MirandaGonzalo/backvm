import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.cookie?.replace('token=', '');

        const isPublic = this.reflector.get<boolean>(
            'isPublic',
            context.getHandler(),
        );

        if (isPublic) {
            return true;
        }

        if (!token) {
            throw new UnauthorizedException('Token no proporcionado');
        }

        try {
            const payload = this.jwtService.verify(token);
            request.params.id_usuario = payload.id;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Token inválido');
        }
    }
}