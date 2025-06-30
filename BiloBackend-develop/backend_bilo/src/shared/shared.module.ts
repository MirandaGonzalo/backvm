import { Module } from '@nestjs/common';
import { UtilsService } from './utils/utils.service';
import { ContraseñaUtils } from './utils/contraseña.util';
import { ValidacionUtils } from './utils/validacion.util';

@Module({
    providers: [UtilsService, ContraseñaUtils, ValidacionUtils],
    exports: [UtilsService, ContraseñaUtils, ValidacionUtils],
})

export class SharedModule {}


