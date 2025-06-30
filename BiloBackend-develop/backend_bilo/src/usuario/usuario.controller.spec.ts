import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

describe('UsuarioController', () => {
    let controller: UsuarioController;

    const usuarioServiceMock = {
        findAll: jest.fn().mockResolvedValue([{ email: 'test@test.com', nombre: 'Test' }]),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsuarioController],
            providers: [
                { provide: UsuarioService, useValue: usuarioServiceMock },
            ],
        }).compile();

        controller = module.get<UsuarioController>(UsuarioController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

});
