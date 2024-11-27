import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { ClsService } from 'nestjs-cls';
import { UserService } from '../users/user.service';
import { User } from '../users/user.schema';

@Injectable()
export class UserInjectorInterceptor implements NestInterceptor {
  constructor(
    private userService: UserService,
    private readonly cls: ClsService,
  ) {}

  getUserEmailFromRequest(req: Request) {
    const authHeader = req.headers['authorization'];
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const base64String = authHeader.substring(7).split('.')[1];
      const decodedValue = JSON.parse(
        Buffer.from(base64String, 'base64').toString('ascii'),
      );

      return decodedValue.email;
    }

    return undefined;
  }

  async intercept(context: ExecutionContext, next: CallHandler<any>) {
    const email = this.getUserEmailFromRequest(
      context.switchToHttp().getRequest(),
    );
    if (email) {
      let user: User;

      try {
        user = await this.userService.findByEmail(email);
      } catch (NotFoundException) {
        user = await this.userService.create({
          email: email,
          name: '',
          registerDate: new Date(),
        });
      }

      this.cls.set('user', user);
    }
    return next.handle();
  }
}
