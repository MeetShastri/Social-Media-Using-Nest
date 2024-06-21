import { Test, TestingModule } from '@nestjs/testing';
import { FriendrequestsController } from './friendrequests.controller';

describe('FriendrequestsController', () => {
  let controller: FriendrequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendrequestsController],
    }).compile();

    controller = module.get<FriendrequestsController>(FriendrequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
