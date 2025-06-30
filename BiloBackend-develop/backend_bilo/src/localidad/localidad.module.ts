import { Module } from '@nestjs/common';
import { LocalidadController } from './localidad.controller';
import { LocalidadService } from './localidad.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProvinciaModule } from 'src/provincia/provincia.module';

@Module({
  imports: [PrismaModule, ProvinciaModule],
  controllers: [LocalidadController],
  providers: [LocalidadService],
  exports: [LocalidadService]
})
export class LocalidadModule {}
