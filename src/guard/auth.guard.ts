import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from './auth.public';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtservice: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('is public', isPublic);

    if (isPublic) {
      // 💡 See this condition
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extracttokenfromheader(request);
    if (!token) {
      throw new UnauthorizedException('Not a valid token');
    }
    try {
      console.log(40, 'test');

      const payload = await this.jwtservice.verifyAsync(token);
      request['userid'] = payload;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('permission denied');
    }

    return true;
  }

  private extracttokenfromheader(request: Request): string | undefined {
    const r = request.headers.authorization?.split(' ')[1];

    return r;
  }
}
