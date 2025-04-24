import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';
import { LoginUserEntity } from './entities/login.user.entity';
import { LoginUserDto } from './dto/login.user.dto';
import { Public } from 'src/guard/auth.public';
import { Roles } from 'src/roles/roles.decoretors';
import { Role } from 'src/roles/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('signup')
  async signup(@Body() createuserdto: CreateUserDto) {
    return this.authService.sginupuser(createuserdto);
  }

  @Public()
  @Post('signin')
  async login(@Body() loginuserdto: LoginUserDto) {
    return this.authService.signin(loginuserdto);
  }

  @Roles(Role.Admin)
  @Get('check-guard')
  async checkguard() {
    return 'checkguard';
  }
}
