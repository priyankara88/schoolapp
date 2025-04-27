import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserEntity } from './entities/create.user.entity';
import { Users } from './schemas/create.user.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserEntity } from './entities/login.user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginUser } from './schemas/login.user.schema';
import { v4 as uuidv4 } from 'uuid';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModal: Model<Users>,
    @InjectModel(LoginUser.name) private userLoginModal: Model<LoginUser>,
    private jwtservice: JwtService,
  ) {}
  async sginupuser(createuserdto): Promise<UserEntity> {
    const { name, email, password } = createuserdto;

    const IsUser = await this.userModal.findOne({ email: createuserdto.email });

    if (IsUser) {
      console.log(123);

      throw new BadRequestException('User Alrady exist');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const DBUser = await this.userModal.create({
      name,
      email,
      password: hashPassword,
    });

    return { name: DBUser.name, email: DBUser.email };
  }

  async signin(loginuserdto): Promise<LoginUserEntity> {
    const { email, password } = loginuserdto;
    const isUser = await this.userModal.findOne({
      email: loginuserdto.email,
    });
    if (!isUser) {
      throw new NotFoundException('Email Address is Not found');
    }

    const isPassword = await bcrypt.compare(password, isUser.password);

    if (!isPassword) {
      throw new NotFoundException('Passsword is not match');
    }

    const accesstoken = await this.createjwtToken(isUser._id);

    return accesstoken;
  }

  async createjwtToken(userid) {
    //const payload = { userid, roles: ['admin'] };
    const payload = { userid, roles: ['user'] };
    const token = this.jwtservice.sign(payload);
    const tokenreffresh = await this.createReffreshtoken(userid);
    return { token: token, reffreshtoken: tokenreffresh.reffreshtoken };
  }

  async createReffreshtoken(userid) {
    const expiredate = new Date();
    expiredate.setDate(expiredate.getDate() + 10);
    const reffrestoken = uuidv4();
    const token = await this.userLoginModal.create({
      userid: userid,
      reffreshtoken: reffrestoken,
      expiredate: expiredate,
    });

    return token;
  }
}
