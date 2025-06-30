import { Test, TestingModule } from '@nestjs/testing';
import { CondicionIvaController } from './condicion-iva.controller';

describe('CondicionIvaController', () => {
  let controller: CondicionIvaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CondicionIvaController],
    }).compile();

    controller = module.get<CondicionIvaController>(CondicionIvaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
