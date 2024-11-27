import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthenticationGuard } from '@nestjs-cognito/auth';
import { UserInjectorInterceptor } from './auth/user-injector.interceptor';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClsModule } from 'nestjs-cls';
import { WebModule } from './web/web.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    // CognitoAuthModule.register({
    //   jwtVerifier: {
    //     userPoolId: "us-east-1_ULYez0ugI",
    //     clientId: "5buppcdrjc94ap59tsjpjbm5o2",
    //     tokenUse: "id"
    //   }
    // })
    AuthModule,
    WebModule,
  ],
  controllers: [],
})
export class AppModule {}
