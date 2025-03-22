import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/modules/users/schemas/user.schema';

export function makeUser(override: Partial<User> = {}) {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    emailConfirmed: override.emailConfirmed ?? false,
    profile: 'admin',
    avatar: faker.image.avatar(),
    registrationNumber: faker.string.uuid(),
    ...override,
  };
}

@Injectable()
export class UserFactory {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(data: Partial<User> = {}): Promise<UserDocument> {
    const userData = makeUser(data);

    const savedUser = new this.userModel(userData);
    await savedUser.save();

    return savedUser;
  }
}
