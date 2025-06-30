import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { PrismaService } from '../prisma/prisma.service';
import { UtilsService } from 'src/shared/utils/utils.service';

describe('UsuarioService', () => {
  let service: UsuarioService;

  const prismaMock = {
    usuario: {
      findMany: jest.fn().mockResolvedValue([{ email: 'test@test.com', nombre: 'Test' }]),
      create: jest.fn().mockResolvedValue({ id: 1, nombre: 'Test', email: 'test@test.com' }),
      findUnique: jest.fn().mockImplementation(({ where: { id } }) => {
        if (id === 1) return Promise.resolve({ id: 1, nombre: 'Test', email: 'test@test.com', contraseña: 'pass' });
        return Promise.resolve(null);
      }),
      update: jest.fn().mockResolvedValue({ id: 1, nombre: 'Test Updated', email: 'test@test.com', contraseña: 'pass' }),
    },
  };

  const utilsMock = {
    hayCambios: jest.fn().mockReturnValue(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: PrismaService, useValue: prismaMock },
        { provide: UtilsService, useValue: utilsMock },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return users', async () => {
    const users = await service.findAll();
    expect(users).toEqual([{ email: 'test@test.com', nombre: 'Test' }]);
    expect(prismaMock.usuario.findMany).toHaveBeenCalled();
  });

});