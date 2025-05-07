import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly HASH_SALT_LENGTH = 8;

  async hashPassword(password: string): Promise<string> {
    return hash(password, this.HASH_SALT_LENGTH);
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}