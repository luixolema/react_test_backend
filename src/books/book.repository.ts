import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from '../comun/data/abstract.respository';
import { Book } from './book.schema';

@Injectable()
export class BookRepository extends AbstractRepository<Book> {
  protected readonly logger = new Logger(BookRepository.name);

  constructor(@InjectModel(Book.name) model: Model<Book>) {
    super(model);
  }
}
