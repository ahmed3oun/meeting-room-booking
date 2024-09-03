import { getMailBody } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'
import { IUser } from '../../../libs/common/src/types/schemas';

// TO TEST SMTP SERVER
const getTestAccount = async () => await nodemailer.createTestAccount();
let test_account;
getTestAccount().then((_test_account) => {
  test_account = _test_account;
});

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private readonly transporter = nodemailer.createTransport({
    service: 'gmail', // or any other service provider
    host: this.configService.get<string>('SMTP_HOST'),
    port: this.configService.get<string>('SMTP_PORT'),
    auth: {
      user: /* this.configService.get<string>('EMAIL_USER') || */ test_account.user,
      pass: /* this.configService.get<string>('EMAIL_PASSWORD') || */ test_account.pass,
    },
  });

  constructor(
    private readonly configService: ConfigService,
  ) { }

  async sendReminderEmail(guestEmail: string, meetingDetails: any) {
    this.logger.log(`**** sending reminder email ...`)
    const mailOptions = {
      from: this.configService.get<string>('EMAIL_USER'),
      to: guestEmail,
      subject: 'Meeting Reminder',
      text: `This is a reminder that you have a meeting scheduled in 30 minutes. Details: ${meetingDetails}`,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      const preview = nodemailer.getTestMessageUrl(info);
      this.logger.log(`Reminder email sent to ${guestEmail}, its preview : ${preview}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${guestEmail}`, error.stack);
    }
  }

  async sendConfirmEmail(
    ownerUser: IUser, guestEmails: string[],
    confirmationLinks: string[], meetingDetails: any) {
    this.logger.log(`**** sending confirm email ...`)
    for (let i: number = 0; i < guestEmails.length; i++) {
      const mailOptions = {
        from: this.configService.get<string>('EMAIL_USER'),
        to: guestEmails[i],
        subject: 'Meeting Confirmation',
        text: getMailBody({
          name: guestEmails[i].split('@')[0],
          email: guestEmails[i],
          message: `
          This is a confirmation that you have a meeting will be scheduled at ${meetingDetails.startTime}
          to ${meetingDetails.endTime} handled by ${ownerUser.name}
          `,
          confirmationLink: confirmationLinks[i]
        })
      };
      try {
        const info = await this.transporter.sendMail(mailOptions);
        const preview = nodemailer.getTestMessageUrl(info);
        this.logger.log(`Reminder email sent to ${guestEmails[i]}, its preview : ${preview}`);
      } catch (error) {
        this.logger.error(`Failed to send email to ${guestEmails[i]}`, error.stack);
      }
    }
  }
}
