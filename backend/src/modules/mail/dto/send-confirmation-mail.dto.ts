import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendConfirmationMailDto {
  @IsEmail()
  to: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  confirmationToken: string;
}
