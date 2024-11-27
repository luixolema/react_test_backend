import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { DatabaseModule } from '../comun/data/db.module';
import { Book, BookSchema } from './book.schema';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [BookService, BookRepository],
  exports: [BookService],
})
export class BooksModule {}
