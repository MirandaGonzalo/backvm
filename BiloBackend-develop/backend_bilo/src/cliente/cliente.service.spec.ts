import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UtilsService } from 'src/shared/utils/utils.service';
import { ClienteController } from './cliente.controller';

describe('ClienteService', () => {
  let service: ClienteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController], // solo controladores aquí
      providers: [
        ClienteService,    // el servicio que quieres testear
        PrismaService,     // servicios dependientes
        UtilsService,
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
