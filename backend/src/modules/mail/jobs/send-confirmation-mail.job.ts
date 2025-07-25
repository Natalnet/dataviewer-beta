import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { MailType } from "../enum/mail-type.enum";
import { IMailJobStrategy } from "../interfaces/mail-job-strategy.interface";
import { SendConfirmationMailDto } from "../dto/send-confirmation-mail.dto";

@Injectable()
export class SendConfirmationMailJob implements IMailJobStrategy {
  constructor(private readonly mailerService: MailerService) {}

  async execute(data: SendConfirmationMailDto): Promise<void> {
    const subject = "Confirme sua conta";
    const template = MailType.CONFIRMATION;
    const confirmationUrl = `http://localhost:3333/auth/confirm?token=${data.confirmationToken}`;
    const context = { name: data.name, confirmationUrl };

    await this.mailerService.sendMail({
      to: data.to,
      subject,
      template,
      context,
    });
  }
}