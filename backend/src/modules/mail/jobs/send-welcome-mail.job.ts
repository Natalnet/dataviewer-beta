import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { MailType } from "../enum/mail-type.enum";
import { IMailJobStrategy } from "../interfaces/mail-job-strategy.interface";
import { IMailJobData } from "../interfaces/mail-job-data.interface";

@Injectable()
export class SendWelcomeMailJob implements IMailJobStrategy {
  constructor(private readonly mailerService: MailerService) {}

  async execute(data: IMailJobData): Promise<void> {
    const subject = "Bem-vindo à nossa plataforma!";
    const template = MailType.WELCOME;
    const context = { name: data.name };

    await this.mailerService.sendMail({
      to: data.to,
      subject,
      template,
      context,
    });
  }
}