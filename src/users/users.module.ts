import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from '../comun/data/db.module';
import { User, UserSchema } from './user.schema';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UsersModule {}
