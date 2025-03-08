import { PartialType } from '@nestjs/mapped-types'; // permite a atualização de parte dos atributos
import { ApiProperty } from '@nestjs/swagger';

export class TempUpUserDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  registrationNumber: string;
}

export class UpdateUserDto extends PartialType(TempUpUserDto) {}
