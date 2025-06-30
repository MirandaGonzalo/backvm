import { Module } from '@nestjs/common';
import { CondicionIvaService } from './condicion-iva.service';
import { CondicionIvaController } from './condicion-iva.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [CondicionIvaService],
  controllers: [CondicionIvaController],
  exports: [CondicionIvaService]
})
export class CondicionIvaModule {}
