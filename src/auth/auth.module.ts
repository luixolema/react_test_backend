import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInjectorInterceptor } from './user-injector.interceptor';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  exports: [AuthService],
  providers: [
    AuthService,
    // { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_INTERCEPTOR, useClass: UserInjectorInterceptor },
  ],
})
export class AuthModule {}
