import { PartialType } from '@nestjs/mapped-types'; // permite a atualização de parte dos atributos

export class TempUpUserDto {
  name: string;
  avatar: string;
  registrationNumber: string;
}

export class UpdateUserDto extends PartialType(TempUpUserDto) {}
