import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ModifyFavoriteDto } from './dto/ModifyFavoriteDto';
import { CreateUserDto } from './dto/CreateUserDto';
import ClassValidator from '../comun/ClassValidator';
import { User } from './user.schema';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cls: ClsService,
  ) {}

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async create(createUserDto: CreateUserDto) {
    await ClassValidator.validate(createUserDto);
    return this.userRepository.create({ ...createUserDto, favoriteBooks: [] });
  }

  async getFavoriteBooksIds(id: string) {
    const user = await this.userRepository.findById(id);
    return user.favoriteBooks;
  }

  async addFavorites(request: ModifyFavoriteDto) {
    await ClassValidator.validate(request);
    const user = this.getLoggedUser();
    const favorites = new Set([...user.favoriteBooks, ...request.bookIds]);
    this.userRepository.findByIdAndUpdate(user._id.toString(), {
      favoriteBooks: [...favorites],
    });

    return [...favorites];
  }

  async removeFavorites(request: ModifyFavoriteDto) {
    await ClassValidator.validate(request);
    const user = this.getLoggedUser();
    const favorites = new Set(user.favoriteBooks);
    request.bookIds.forEach((bookId) => {
      favorites.delete(bookId);
    });
    this.userRepository.findByIdAndUpdate(user._id.toString(), {
      favoriteBooks: [...favorites],
    });

    return [...favorites];
  }

  private getLoggedUser() {
    return this.cls.get<User>('user');
  }
}
