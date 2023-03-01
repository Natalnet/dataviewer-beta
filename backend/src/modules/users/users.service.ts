import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { hashSync } from 'bcrypt';
import { UserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    try { 
      const createdUser = await new this.userModel({
        ...createUserDto,
        password: hashSync(createUserDto.password, 10),
      }).save();

      const res: UserDto = {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
      };

      return res;
    }
    catch (error) {
      //console.log(error) 
      //TODO: melhorar o tratamento de exceção 
      throw new ForbiddenException('Credentials Error!') 

    }
  

  }

  async findAll(): Promise<UserDto[]> {
    const users = await this.userModel.find().exec();

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      name: user.name,
    }));
  }

  async findOne(id: string): Promise<UserDto> {
    const user = await this.userModel.findById(id).exec();
    return {
      email: user.email,
      name: user.name,
      id: user.id,
    };
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, {
        $set: updateUserDto,
      })
      .exec();

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
    };
  }

  async remove(id: string): Promise<void> {
    this.userModel.findByIdAndDelete(id).exec();
  }
}
