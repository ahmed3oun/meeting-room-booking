import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { BookingSchedulerService } from './booking-scheduler.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { RmqModule } from '@app/common';
import { GuestService } from '../guest/guest.service';
import { UserService } from '../user/user.service';
import { RoomService } from '../room/room.service';

@Module({
  imports: [
    PrismaModule,
    RmqModule.register({
      name: "EMAIL"
    }),
  ],
  providers: [BookingService, BookingSchedulerService, GuestService, UserService, RoomService],
  controllers: [BookingController],
  exports: [BookingService]
})
export class BookingModule { }
