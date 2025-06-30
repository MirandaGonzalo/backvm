import { Module } from '@nestjs/common';
import { ConfiguracionService } from './configuracion.service';
import { ConfiguracionController } from './configuracion.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/shared/utils/utils.service';
import { DireccionService } from 'src/direccion/direccion.service';
import { ProvinciaService } from 'src/provincia/provincia.service';
import { LocalidadService } from 'src/localidad/localidad.service';
import { CondicionIvaService } from 'src/condicion-iva/condicion-iva.service';

@Module({
  providers: [ConfiguracionService, PrismaService, UtilsService, DireccionService, ProvinciaService, LocalidadService, CondicionIvaService],
  controllers: [ConfiguracionController],
  exports: [ConfiguracionService]
})
export class ConfiguracionModule {}
