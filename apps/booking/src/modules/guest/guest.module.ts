import { Module } from '@nestjs/common';
import { GuestService } from './guest.service';
import { GuestController } from './guest.controller';
import { PrismaModule } from '@app/booking/prisma/prisma.module';
import { BookingModule } from '../booking/booking.module';

@Module({
  providers: [GuestService],
  imports: [PrismaModule, BookingModule],
  controllers: [GuestController],
  exports: [GuestService]
})
export class GuestModule { }
