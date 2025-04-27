import { Exclude, Expose, Transform } from 'class-transformer';
import { Role } from '../enums/role.enum';

export class UserResponseDto {
  @Transform(({ obj }) => obj._id)
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Exclude()
  emailConfirmed?: boolean;

  @Exclude()
  role?: Role;

  @Expose()
  avatar?: string;

  @Expose()
  registrationNumber?: string;
}
