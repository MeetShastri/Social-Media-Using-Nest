import { Test, TestingModule } from '@nestjs/testing';
import { ProfilepicsController } from './profilepics.controller';

describe('ProfilepicsController', () => {
  let controller: ProfilepicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfilepicsController],
    }).compile();

    controller = module.get<ProfilepicsController>(ProfilepicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
