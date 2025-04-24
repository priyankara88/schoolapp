import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Users, UserSchema } from './schemas/create.user.schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { LoginSchema, LoginUser } from './schemas/login.user.schema';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/guard/auth.guard';
import { RolesGuard } from 'src/guard/role.gurd';

@Module({
  imports: [
    ConfigModule,

    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UserSchema,
      },
      {
        name: LoginUser.name,
        schema: LoginSchema,
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },

    AuthService,
  ],
})
export class AuthModule {}
