import { PartialType } from '@nestjs/mapped-types';

export class TempUpUserDto {
  name: string;
  avatar: string;
  registrationNumber: string;
}

export class UpdateUserDto extends PartialType(TempUpUserDto) {}
