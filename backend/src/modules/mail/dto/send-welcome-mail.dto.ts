import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendWelcomeMailDto {
  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}