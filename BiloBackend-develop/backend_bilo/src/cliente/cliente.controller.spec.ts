import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { UtilsService } from 'src/shared/utils/utils.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ClienteController', () => {
  let controller: ClienteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController, UtilsService, PrismaService],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
