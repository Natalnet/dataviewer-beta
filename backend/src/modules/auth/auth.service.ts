import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('A senha inserida está incorreta!')
    }

    if (!user.emailConfirmed) {
      throw new BadRequestException('Você precisa confirmar seu e-mail para poder se autenticar!')
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      emailConfirmed: user.emailConfirmed
    };
  }

  async login(user: LoginDto) {
    const payload = { email: user.email, sub: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
