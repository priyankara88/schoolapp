import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sginup')
  async sginup(createuserdto: CreateUserDto) {
    this.authService.sginupuser(createuserdto);
  }
}
