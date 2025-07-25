import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { UserResponseDto } from './dto/user-response.dto';
import { mapToDto } from 'src/common/utils/mapper.util';
import { UpdateUserDto } from './dto/update-user.dto';
import { BcryptService } from '../auth/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) 
    private userModel: Model<UserDocument>,
    private bcryptService: BcryptService,
  ) {}

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => mapToDto(UserResponseDto, user));
  }

  async create(
    createUserDto: Omit<CreateUserDto, 'passwordConfirmation'>,
  ): Promise<UserResponseDto> {
    const user = await this.userModel.create(createUserDto);
    return mapToDto(UserResponseDto, user);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return mapToDto(UserResponseDto, user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneByRegistrationNumber(registrationNumber: string): Promise<User | null> {
    return this.userModel.findOne({ registrationNumber }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    if (updateUserDto.email) {
      const existingUser = await this.userModel.findOne({ email: updateUserDto.email }).exec();
      if (existingUser && existingUser._id.toString() !== id) {
        throw new BadRequestException('Email is already in use by another user.');
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.bcryptService.hashPassword(updateUserDto.password);
    }

    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: updateUserDto }, { new: true, runValidators: true })
      .exec();

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return mapToDto(UserResponseDto, user);
  }

  async delete(id: string): Promise<void> {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('User not found.');
    }
  }

  async findByConfirmationToken(token: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ confirmationToken: token }).exec();
  }
}
