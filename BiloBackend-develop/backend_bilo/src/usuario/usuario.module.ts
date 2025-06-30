import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { SharedModule } from 'src/shared/shared.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UtilsService } from 'src/shared/utils/utils.service';
import { ContraseñaUtils } from 'src/shared/utils/contraseña.util';

@Module({
    providers: [UsuarioService, UtilsService, ContraseñaUtils],
    imports: [SharedModule, PrismaModule],
    controllers: [UsuarioController],
    exports: [UsuarioService]
})
export class UsuarioModule { }
