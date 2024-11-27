import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/createBookDto';

@Injectable()
export class BookService {
  constructor(private readonly userRepository: BookRepository) {}

  findAll() {
    return this.userRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  getBooks(ids: string[]) {
    return this.userRepository.find({ _id: { $in: ids } });
  }

  addBook(request: CreateBookDto) {
    return this.userRepository.create(request);
  }
}
