import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IMailJobStrategy } from '../interfaces/mail-job-strategy.interface';
import { SendWelcomeMailJob } from '../jobs/send-welcome-mail.job';
import { SendResetPasswordMailJob } from '../jobs/send-reset-password-mail.job';
import { MailType } from '../enum/mail-type.enum';
import { SendConfirmationMailJob } from '../jobs/send-confirmation-mail.job';

@Injectable()
export class MailJobFactory {
  constructor(
    private readonly welcomeEmailJob: SendWelcomeMailJob,
    private readonly resetPasswordEmailJob: SendResetPasswordMailJob,
    private readonly confirmationEmailJob: SendConfirmationMailJob,
  ) {}

  create(type: MailType): IMailJobStrategy {
    if (!Object.values(MailType).includes(type)) {
      throw new InternalServerErrorException(`Invalid mail type: ${type}`);
    }

    switch (type) {
      case MailType.WELCOME:
        return this.welcomeEmailJob;
      case MailType.RESET_PASSWORD:
        return this.resetPasswordEmailJob;
      case MailType.CONFIRMATION:
        return this.confirmationEmailJob;
      default:
        throw new InternalServerErrorException(`Unknown email type: ${type}`);
    }
  }
}