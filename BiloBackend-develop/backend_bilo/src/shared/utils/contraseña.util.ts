import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class ContraseñaUtils {
    constructor() { }

    static async hashearContraseña(password: string): Promise<string> {
        return argon2.hash(password);
    }

    static async compararContraseña(hash: string, contraseña: string): Promise<boolean> {
        return argon2.verify(hash, contraseña);
    }
}