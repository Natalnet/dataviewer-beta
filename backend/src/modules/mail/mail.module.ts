import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailProducer } from './mail.producer';
import { MailProcessor } from './mail.processor';
import { MailJobFactory } from './factories/mail-job.factory';
import { SendWelcomeMailJob } from './jobs/send-welcome-mail.job';
import { SendResetPasswordMailJob } from './jobs/send-reset-password-mail.job';
import { BullQueueProviderModule } from 'src/providers/queue/bull.module';
import { MailerProviderModule } from 'src/providers/mail/mailer.module';
import { SendConfirmationMailJob } from './jobs/send-confirmation-mail.job';

@Module({
  imports: [
    BullQueueProviderModule,
    MailerProviderModule,
  ],
  providers: [
    MailService,
    MailProducer,
    MailProcessor,
    MailJobFactory,
    SendWelcomeMailJob,
    SendResetPasswordMailJob,
    SendConfirmationMailJob,
  ],
  exports: [MailService],
})
export class MailModule {}
