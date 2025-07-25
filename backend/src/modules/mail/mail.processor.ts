import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { IMailJob } from "./interfaces/mail-job.interface";
import { MailJobFactory } from "./factories/mail-job.factory";

@Processor('mail')
export class MailProcessor extends WorkerHost {
  constructor(private readonly mailJobFactory: MailJobFactory) {
    super();
  }

  async process(job: Job<IMailJob>): Promise<void> {
    try {
      const { type, to, data } = job.data;
      const strategy = this.mailJobFactory.create(type);
      await strategy.execute({ to, ...data });
    } catch (error) {
      console.error(`Failed to process job ${job.id}: ${error.message}`);
      throw error;
    }
  }
}
