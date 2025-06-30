import { Module } from '@nestjs/common';
import { DireccionService } from './direccion.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProvinciaModule } from 'src/provincia/provincia.module';
import { LocalidadModule } from 'src/localidad/localidad.module';

@Module({
  imports: [PrismaModule, ProvinciaModule, LocalidadModule],
  providers: [DireccionService],
  exports: [DireccionService]
})

export class DireccionModule {}
