import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { TokenService } from './token.service';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { mapToDto } from 'src/utils/mapper.util';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private usersService: UsersService,
    private bcryptService: BcryptService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponseDto> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await this.bcryptService.comparePasswords(password, user.password);
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
    const { name, email, password, registrationNumber } = signUpDto;

    const existingUser = await this.usersService.findOneByEmail(email);

    if (existingUser) {
      throw new ConflictException('Email is already registered');
    }

    const existingRegistrationNumber = await this.usersService.findOneByRegistrationNumber(registrationNumber);
    
    if (existingRegistrationNumber) {
      throw new ConflictException('Registration number is already registered');
    }

    const hashedPassword = await this.bcryptService.hashPassword(password);
    return this.usersService.create({ name, email, password: hashedPassword, registrationNumber });
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    const token = await this.tokenService.validateRefreshToken(refreshToken);

    const user = await this.usersService.findOne(token.userId.toString());

    await this.tokenService.revokeToken(token);

    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signOut(refreshToken: string): Promise<void> {
    const token = await this.tokenService.validateRefreshToken(refreshToken);
    await this.tokenService.revokeToken(token);
  }
}
