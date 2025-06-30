import { Module } from '@nestjs/common';
import { ProvinciaController } from './provincia.controller';
import { ProvinciaService } from './provincia.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProvinciaController],
  providers: [ProvinciaService],
  exports: [ProvinciaService]
})
export class ProvinciaModule {}
