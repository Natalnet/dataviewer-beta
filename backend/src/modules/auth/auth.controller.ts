import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RequestWithLocalUser } from 'src/types/Requests';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: RequestWithLocalUser) {
    return this.authService.login(req.user);
  }
}
