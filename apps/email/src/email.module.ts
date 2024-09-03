import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import { EmailSchedulerService } from './email-scheduler.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/email/.env'
    }),
    RmqModule
  ],
  controllers: [EmailController],
  providers: [EmailService, EmailSchedulerService],
})
export class EmailModule {}
