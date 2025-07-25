import { SendWelcomeMailDto } from "../dto/send-welcome-mail.dto";

export interface IMailJobStrategy {
  execute(data: SendWelcomeMailDto): Promise<void>;
}