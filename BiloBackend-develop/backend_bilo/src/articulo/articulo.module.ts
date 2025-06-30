import { Module } from '@nestjs/common';
import { ArticuloService } from './articulo.service';
import { UtilsService } from 'src/shared/utils/utils.service';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArticuloController } from './articulo.controller';

@Module({
    providers: [ArticuloService, UtilsService],
    imports: [SharedModule, PrismaModule],
    controllers: [ArticuloController],
    exports: [ArticuloService]
})
export class ArticuloModule {}
