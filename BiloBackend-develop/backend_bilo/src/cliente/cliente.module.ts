import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { DireccionModule } from 'src/direccion/direccion.module';
import { TipoDocumentoModule } from 'src/tipo-documento/tipo-documento.module';
import { CondicionIvaModule } from 'src/condicion-iva/condicion-iva.module';

@Module({
    imports: [SharedModule, PrismaModule, DireccionModule, TipoDocumentoModule, CondicionIvaModule],
    providers: [ClienteService],
    controllers: [ClienteController],
    exports: [ClienteService]
})
export class ClienteModule {}
