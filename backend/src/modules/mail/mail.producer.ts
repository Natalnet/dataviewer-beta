import { InjectQueue } from "@nestjs/bullmq";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { Queue } from "bullmq";
import { IMailJob } from "./interfaces/mail-job.interface";

@Injectable()
export class MailProducer {
  constructor(@InjectQueue('mail') private queue: Queue) {}

  async addEmailToQueue(job: IMailJob): Promise<void> {
    try {
      await this.queue.add('send-email', job);
    } catch (e) {
      console.error("Failed to add email to queue:", e);
      throw new InternalServerErrorException("Failed to enqueue email");
    }
  }
}