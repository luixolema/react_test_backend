import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { EditBookDto } from './dto/editBookDto';
import ClassValidator from '../comun/ClassValidator';
import { Book } from './book.schema';
import { PageResponse } from '../comun/data/abstract.respository';
import { CreateBookDto } from './dto/createBookDto';
import { FindBooksDto } from './dto/FindBooksDto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  find() {
    return this.bookRepository.find({});
  }

  findOne(id: string) {
    return this.bookRepository.findById(id);
  }

  remove(id: string) {
    return this.bookRepository.findByIdAndDelete(id);
  }

  getBooks(ids: string[]) {
    return this.bookRepository.find({ _id: { $in: ids } });
  }

  async addBook(dto: CreateBookDto) {
    await ClassValidator.validate(dto);
    return this.bookRepository.create(dto);
  }

  async editBook(dto: EditBookDto) {
    await ClassValidator.validate(EditBookDto);
    return this.bookRepository.findByIdAndUpdate(dto._id, dto);
  }

  async findBook(
    findBooksDto: FindBooksDto,
    ids: string[] = [],
  ): Promise<PageResponse<Book>> {
    await ClassValidator.validate(findBooksDto);
    const regex = new RegExp(findBooksDto.query, 'i');

    const filterQuery: FilterQuery<Book> = {
      $or: [{ title: regex }, { author: regex }],
    };

    if (ids.length) {
      filterQuery.$and = [{ _id: { $in: ids } }];
    }

    return this.bookRepository.queryPage(
      filterQuery,
      findBooksDto.page,
      findBooksDto.pageSize,
      { field: 'title', order: 'asc' },
    );
  }
}
