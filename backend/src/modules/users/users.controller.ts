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

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' }) // Resposta esperada
  @ApiResponse({
    status: 400,
    description: 'Bad Request - The input data is invalid.',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - User does not have permission to perform this operation.',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Get profile information of the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'User profile retrieved successfully.',
  }) // Resposta esperada
  @ApiResponse({
    status: 401,
    description:
      'Unauthorized - Authentication credentials are missing or invalid.',
  })
  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @Get('info')
  getProfile(@Request() req: RequestWithUser) {
    return this.usersService.findOne(req.user.userId);
  }

  @ApiBearerAuth('KEY_AUTH')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update authenticated user account information' })
  @ApiResponse({
    status: 200,
    description: 'User account updated successfully.',
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
  @Patch('update-account')
  update(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.userId, updateUserDto);
  }

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
  @Delete('delete-account')
  remove(@Request() req: RequestWithUser) {
    return this.usersService.remove(req.user.userId);
  }
}
