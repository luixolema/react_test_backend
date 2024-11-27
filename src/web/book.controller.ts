import { Body, Controller, Post } from '@nestjs/common';
import { BookService } from '../books/book.service';
import { CreateBookDto } from '../books/dto/createBookDto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  addFavoriteBooks(@Body() request: CreateBookDto) {
    return this.bookService.addBook(request);
  }
}
