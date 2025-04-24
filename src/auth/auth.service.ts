import { Injectable } from '@nestjs/common';
import { UserEntity } from './entities/create.user.entity';
import { Users } from './schemas/create.user.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Users.name) private userModal: Model<Users>) {}
  async sginupuser(createuserdto): Promise<UserEntity> {
    return { name: 'test', email: 'test' };
  }
}
