import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioController } from './usuario/usuario.controller';
import { UtilsService } from './shared/utils/utils.service';
import { UsuarioModule } from './usuario/usuario.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClienteService } from './cliente/cliente.service';
import { ClienteModule } from './cliente/cliente.module';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { TipoDocumentoModule } from './tipo-documento/tipo-documento.module';
import { DireccionModule } from './direccion/direccion.module';
import { CondicionIvaModule } from './condicion-iva/condicion-iva.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { LocalidadModule } from './localidad/localidad.module';
import { SharedModule } from './shared/shared.module';
import { ArticuloService } from './articulo/articulo.service';
import { ArticuloModule } from './articulo/articulo.module';
import { ConfiguracionModule } from './configuracion/configuracion.module';

@Module({
  imports: [SharedModule, UsuarioModule,PrismaModule, AuthModule, ClienteModule, TipoDocumentoModule, DireccionModule, CondicionIvaModule, ProvinciaModule, LocalidadModule, ArticuloModule, ConfiguracionModule],
  controllers: [AppController, UsuarioController],
  providers: [AppService, UtilsService, JwtService, ClienteService, ArticuloService],
})

export class AppModule {}
