import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SendResetPasswordMailDto {
  @IsEmail()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  resetLink: string;
}