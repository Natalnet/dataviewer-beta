import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenService } from './token.service';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { mapToDto } from 'src/utils/mapper.util';
import { HASH_SALT_LENGTH } from 'src/shared/constants/hash.constants';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return mapToDto(UserResponseDto, user);
  }

  async signIn(user: UserResponseDto): Promise<AuthResponseDto> {
    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signUp(signUpDto: SignUpDto): Promise<UserResponseDto> {
    const { name, email, password } = signUpDto;

    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new UnauthorizedException('Email is already registered');
    }

    const hashedPassword = await hash(password, HASH_SALT_LENGTH);
    return this.usersService.create({ name, email, password: hashedPassword });
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    const token = await this.tokenService.validateRefreshToken(refreshToken);

    const user = await this.usersService.findOne(token.userId.toString());

    await this.tokenService.revokeToken(token);

    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
