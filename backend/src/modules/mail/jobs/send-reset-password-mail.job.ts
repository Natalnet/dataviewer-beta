import { Injectable } from "@nestjs/common";
import { IMailJobStrategy } from "../interfaces/mail-job-strategy.interface";
import { IMailJobData } from "../interfaces/mail-job-data.interface";

@Injectable()
export class SendResetPasswordMailJob implements IMailJobStrategy {
  async execute(data: IMailJobData): Promise<void> {
    console.log(`Sending reset password email to: ${data.to}`);
  }
}