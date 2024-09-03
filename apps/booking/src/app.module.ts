import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { RoomModule } from './modules/room/room.module';
import { GuestModule } from './modules/guest/guest.module';
import { BookingModule } from './modules/booking/booking.module';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    RoomModule,
    GuestModule,
    BookingModule,
    PrismaModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/booking/.env'
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRY,
      },
    }),
  ],
  exports: [AppModule],
})
export class AppModule { }
