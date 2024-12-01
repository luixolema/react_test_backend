import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInjectorInterceptor } from './user-injector.interceptor';
import { UsersModule } from '../users/users.module';
import { AuthenticationGuard, CognitoAuthModule } from '@nestjs-cognito/auth';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    CognitoAuthModule.registerAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => {
        return {
          jwtVerifier: {
            userPoolId: configService.get('COGNITO_USER_POOL_ID'), // from environment
            clientId: configService.get('COGNITO_CLIENT_ID'), // from environment
            tokenUse: 'id',
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  exports: [AuthService],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_INTERCEPTOR, useClass: UserInjectorInterceptor },
  ],
})
export class AuthModule {}
