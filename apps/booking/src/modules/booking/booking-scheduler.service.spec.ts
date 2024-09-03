import { Test, TestingModule } from '@nestjs/testing';
import { BookingSchedulerService } from './booking-scheduler.service';

describe('BookingSchedulerService', () => {
  let service: BookingSchedulerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingSchedulerService],
    }).compile();

    service = module.get<BookingSchedulerService>(BookingSchedulerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
