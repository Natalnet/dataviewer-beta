import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { RequestWithLocalUser } from 'src/types/requests';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Login',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successfull',
    schema: {
      type: 'object',
      properties: {
        accessToken: { type: 'string' },
      },
    },
  }) // Resposta esperada
  @ApiResponse({
    status: 400,
    description: 'Bad Request - The input data is invalid.',
  })
  @Post('login')
  async login(@Request() req: RequestWithLocalUser) {
    return this.authService.login(req.user);
  }
}
