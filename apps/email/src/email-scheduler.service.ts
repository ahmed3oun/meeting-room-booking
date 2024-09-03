import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailSchedulerService {

    constructor() { }

    // Implmeneted on booking-scheduler
    // @Cron(CronExpression.EVERY_5_MINUTES)
    // async handleCron() {
    //     // Fetch meetings from database scheduled to start in the next 30 minutes
    //     const meetings = await this.getUpcomingMeetings();

    //     for (const meeting of meetings) {
    //         for (const guest of meeting.guests) {
    //             const meetingDetails = `Room: ${meeting.room}, Time: ${meeting.startTime}`;
    //             await this.emailService.sendReminderEmail(guest.email, meetingDetails);
    //         }
    //     }
    // }

}
