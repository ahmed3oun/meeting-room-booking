import { PrismaService } from '@app/booking/prisma/prisma.service';
import { IBooking } from '@app/common';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron, CronExpression } from '@nestjs/schedule';
import moment from 'moment';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BookingSchedulerService {
    private readonly logger = new Logger(BookingSchedulerService.name)

    constructor(
        private readonly prismaService: PrismaService,
        @Inject('EMAIL') private emailClient: ClientProxy,
    ) {
        this.logger.verbose('BookingSchedulerService initialized');
     }

    private isMeetingWithin30Minutes(startDate: Date): boolean {
        const now = moment();
        const startMoment = moment(startDate);
        const duration = moment.duration(startMoment.diff(now));
        const minutes = duration.asMinutes();
        return minutes <= 30 && minutes > 0;
    }

    @Cron(CronExpression.EVERY_MINUTE)
    async handleBookingReminderCron() {
        this.logger.verbose(`${this.handleBookingReminderCron.name} is running ...`);
        const meetings = await this.prismaService.booking.findMany({
            include: {
                guests: true,
                room: true
            },
            where: {
                confirmed: true
            }
        }) as IBooking[];

        for (const meeting of meetings) {
            if (this.isMeetingWithin30Minutes(meeting.startTime)) {
                for (const guest of meeting.guests) {
                    const payload = {
                        guestEmail: guest.email,
                        meetingDetails: {
                            room: meeting.room,
                            startTime: meeting.startTime,
                        },
                    };

                    await lastValueFrom(
                        this.emailClient.emit('booking_reminder', payload)
                    )
                }
            }
        }
    }
}
