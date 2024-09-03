import { Controller } from '@nestjs/common';
import { EmailService } from './email.service';
import { IUser, RmqService } from '@app/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';

@Controller()
export class EmailController {

  constructor(
    private readonly emailService: EmailService,
    private readonly rmqService: RmqService,
  ) { }

  @EventPattern('booking_created')
  async handleBookingCreated(
    @Payload() data: {
      guestEmails: string[],
      meetingDetails: unknown,
      ownerUser: IUser;
      confirmationLinks: string[];
    },
    @Ctx() context: RmqContext
  ) {
    this.emailService.sendConfirmEmail(
      data.ownerUser,
      data.guestEmails,
      data.confirmationLinks,
      data.meetingDetails
    )
    this.rmqService.ack(context);
  }

  @EventPattern('booking_reminder')
  async handleBookingReminder(
    @Payload() data: {
      guestEmail: string,
      meetingDetails: unknown
    },
    @Ctx() context: RmqContext
  ) {
    this.emailService.sendReminderEmail(data.guestEmail, data.meetingDetails)
    this.rmqService.ack(context);
  }
}
