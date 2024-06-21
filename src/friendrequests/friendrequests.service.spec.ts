import { Test, TestingModule } from '@nestjs/testing';
import { FriendrequestsService } from './friendrequests.service';

describe('FriendrequestsService', () => {
  let service: FriendrequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FriendrequestsService],
    }).compile();

    service = module.get<FriendrequestsService>(FriendrequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
