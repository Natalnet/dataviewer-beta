import { MailType } from "../enum/mail-type.enum";

export interface IMailJob<T = any> {
  type: MailType;
  to: string;
  data: T;
}