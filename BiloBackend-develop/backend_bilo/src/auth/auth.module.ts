import { Module, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ContraseñaUtils } from 'src/shared/utils/contraseña.util';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtAuthGuard } from './guards/jwtAuth.guard';
import { UtilsService } from 'src/shared/utils/utils.service';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [JwtModule.register({
    secret: process.env.JWT_SECRET || 'secretKey',
    signOptions: { expiresIn: '24h' },
  })],
  providers: [
    AuthService, 
    ContraseñaUtils, 
    UsuarioService, 
    JwtAuthGuard, 
    UtilsService, 
    JwtModule,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    UsuarioService,
  ],
  controllers: [AuthController],
  exports: [JwtAuthGuard, JwtModule]
})
export class AuthModule {}
