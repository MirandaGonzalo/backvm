import { Injectable } from '@nestjs/common';
import { isObject } from 'class-validator';

@Injectable()
export class UtilsService {
    static hayCambios(objActual: any, objNuevo: any): boolean {
        for (const key in objNuevo) {
            if (objNuevo[key] !== undefined && objNuevo[key] != objActual[key]) {
                return true;
            }
        }
        return false;
    }

    static hayCambiosRecursivo(objActual: any, objNuevo: any): boolean {
        for (const key in objNuevo) {
            if (isObject(objNuevo[key])) {
                const cambios = this.hayCambiosRecursivo(objActual[key], objNuevo[key]);
                if (cambios) {
                    return true;
                }
            } else if (objNuevo[key] !== undefined && objNuevo[key] != objActual[key]) {
                return true;
            }
        }
        return false;
    }

    static estadoToTexto(estado: boolean): string {
        return estado ? 'Activo' : 'Inactivo';
    }

    static tienePropiedad(estado: boolean): string {
        return estado ? 'Si' : 'No';
    }
}
