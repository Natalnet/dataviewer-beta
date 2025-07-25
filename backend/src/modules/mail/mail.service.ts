import { Injectable } from '@nestjs/common';
import { MailProducer } from './mail.producer';
import { MailType } from './enum/mail-type.enum';
import { SendWelcomeMailDto } from './dto/send-welcome-mail.dto';
import { SendResetPasswordMailDto } from './dto/send-reset-password-mail.dto';
import { SendConfirmationMailDto } from './dto/send-confirmation-mail.dto';

@Injectable()
export class MailService {
  constructor(
    private producer: MailProducer,
  ) {}

  async sendWelcomeEmail(data: SendWelcomeMailDto): Promise<void> {
    await this.producer.addEmailToQueue({
      type: MailType.WELCOME,
      to: data.to,
      data,
    });
  }

  async sendResetPasswordEmail(data: SendResetPasswordMailDto): Promise<void> {
    await this.producer.addEmailToQueue({
      type: MailType.RESET_PASSWORD,
      to: data.to,
      data,
    });
  }

  async sendConfirmationEmail(data: SendConfirmationMailDto): Promise<void> {
    await this.producer.addEmailToQueue({
      type: MailType.CONFIRMATION,
      to: data.to,
      data,
    });
  }
}
