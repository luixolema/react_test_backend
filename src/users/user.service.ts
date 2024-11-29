import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { ModifyFavoriteDto } from './dto/ModifyFavoriteDto';
import { CreateUserDto } from './dto/CreateUserDto';
import { validate } from 'class-validator';
import ClassValidator from '../comun/ClassValidator';


@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
    const user = await this.userRepository.findById(request.userId);
    const favorites = new Set([...user.favoriteBooks, ...request.bookIds]);
    this.userRepository.findByIdAndUpdate(request.userId, {
      favoriteBooks: [...favorites],
    });

    return [...favorites];
  }

  async removeFavorites(request: ModifyFavoriteDto) {
    await ClassValidator.validate(request);
    const user = await this.userRepository.findById(request.userId);
    const favorites = new Set(user.favoriteBooks);
    request.bookIds.forEach((bookId) => {
      favorites.delete(bookId);
    });
    this.userRepository.findByIdAndUpdate(request.userId, {
      favoriteBooks: [...favorites],
    });

    return [...favorites];
  }
}
