import { Test, TestingModule } from '@nestjs/testing';
import { ProfilepicsService } from './profilepics.service';

describe('ProfilepicsService', () => {
  let service: ProfilepicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfilepicsService],
    }).compile();

    service = module.get<ProfilepicsService>(ProfilepicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
