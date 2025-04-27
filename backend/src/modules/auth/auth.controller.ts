import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import { UserResponseDto } from '../users/dto/user-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signIn')
  async signIn(@GetUser() user: UserResponseDto) {
    return this.authService.signIn(user);
  }

  @Post('signUp')
  async signUp(@Body() user: SignUpDto) {
    return this.authService.signUp(user);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
