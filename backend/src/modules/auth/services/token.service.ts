import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshToken, RefreshTokenDocument } from '../schemas/refresh-token.schema';
import { Model } from 'mongoose';
import { add } from 'date-fns';
import { JwtService } from '@nestjs/jwt';
import { UserResponseDto } from '../../users/dto/user-response.dto';
import { randomUUID } from 'crypto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(RefreshToken.name) private refreshTokenModel: Model<RefreshTokenDocument>,
    private configService: ConfigService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  generateTokens(user: UserResponseDto): AuthResponseDto {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    return { accessToken, refreshToken };
  }

  generateAccessToken(user: UserResponseDto): string {
    const payload = {
      sub: user.id,
      email: user.email,
      aud: 'access',
    };

    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRATION'),
    });
  }

  generateRefreshToken(user: UserResponseDto): string {
    const payload = {
      sub: user.id,
      email: user.email,
      aud: 'refresh',
      tokenId: randomUUID(),
    };

    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION'),
    });
  }

  async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
    const decoded = this.validateJwtToken(refreshToken, 'refresh');

    const hashedToken = await this.bcryptService.hashPassword(refreshToken);
    const expiresAt = add(new Date(), {
      days: this.configService.get<number>('REFRESH_TOKEN_DB_EXPIRATION'),
    });

    await this.refreshTokenModel.create({
      userId,
      tokenId: decoded.tokenId,
      token: hashedToken,
      expiresAt,
      revoked: false,
    });
  }

  async validateRefreshToken(refreshToken: string): Promise<RefreshTokenDocument> {
    const decoded = this.validateJwtToken(refreshToken, 'refresh');

    const token = await this.refreshTokenModel.findOne({
      tokenId: decoded.tokenId,
      revoked: false,
      expiresAt: { $gt: new Date() },
    });

    if (!token) {
      throw new UnauthorizedException('Invalid or expired refresh token.');
    }

    const isValid = await this.bcryptService.comparePasswords(refreshToken, token.token);
    if (!isValid) {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    return token;
  }

  async revokeToken(token: RefreshTokenDocument): Promise<void> {
    token.revoked = true;
    await token.save();
  }

  validateJwtToken(token: string, expectedAud?: 'access' | 'refresh'): JwtPayload {
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);

      if (expectedAud && decoded.aud !== expectedAud) {
        throw new UnauthorizedException();
      }

      return decoded;
    } catch (_) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}
