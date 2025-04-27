import { IsEmail, IsString, MinLength, ValidateIf } from "class-validator";
import { Match } from "../decorators/match.decorator";

export class SignUpDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @ValidateIf((o) => o.password)
  @Match('password', { message: 'Password confirmation does not match password' })
  passwordConfirmation: string;
}