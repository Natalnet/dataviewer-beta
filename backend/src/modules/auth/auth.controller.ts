import { Body, Controller, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private readonly cookieExpiration: number;

  constructor(private authService: AuthService, private configService: ConfigService) {
    this.cookieExpiration = this.configService.get<number>('COOKIE_REFRESH_TOKEN_EXPIRATION');
  }

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@GetUser() user: UserResponseDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken } = await this.authService.signIn(user);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: this.cookieExpiration,
      sameSite: 'strict',
      path: '/auth',
    });

    return { accessToken };
  }

  @Post('signUp')
  async signUp(@Body() user: SignUpDto) {
    return this.authService.signUp(user);
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies['refresh_token'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found.');
    }

    const tokens = await this.authService.refreshToken(refreshToken);

    res.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      maxAge: this.cookieExpiration,
      sameSite: 'strict',
      path: '/auth',
    });

    return { accessToken: tokens.accessToken };
  }
}
