import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { User } from '../users/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly cls: ClsService) {}

  getLongedUser(): User {
    return this.cls.get('user');
  }
}
