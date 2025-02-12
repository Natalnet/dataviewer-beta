import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/types/requests';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
    schema: {
      type: 'object',
      properties: {
        acessToken: { type: 'string' },
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        emailConfirmed: { type: 'string' },
        profile: { type: 'string' },
        avatar: { type: 'string' },
        registrationNumber: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - The input data is invalid.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - User does not have permission to perform this operation.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('info')
  @ApiOperation({
    summary: 'Get profile information of the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        email: { type: 'string' },
        name: { type: 'string' },
        profile: { type: 'string' },
        avatar: { type: 'string' },
        registrationNumber: { type: 'string' },
      },
    },
  }) // Resposta esperada
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Authentication credentials are missing or invalid.',
  })
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: RequestWithUser) {
    return this.usersService.findOne(req.user.userId);
  }

  @Patch('update-account')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update authenticated user account information' })
  @ApiResponse({
    status: 200,
    description: 'User account updated successfully.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - The input data is invalid.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Authentication credentials are missing or invalid.',
  })
  update(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.userId, updateUserDto);
  }

  @Delete('delete-account')
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete authenticated user account' })
  @ApiResponse({
    status: 200,
    description: 'User account deleted successfully.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Authentication credentials are missing or invalid.',
  })
  remove(@Request() req: RequestWithUser) {
    return this.usersService.remove(req.user.userId);
  }
}
