import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) return null;

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async login(user: LoginDto) {
    const payload = { email: user.email, sub: user.id };
    const userData = await this.usersService.findOneByEmail(user.email);

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        profile: userData.profile,
        name: userData.name,
        email: userData.email,
        mat: userData.registrationNumber,
      },
    };
  }
}
