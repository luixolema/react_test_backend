import { Body, Controller, Post, Patch, Delete, Param } from '@nestjs/common';
import { BookService } from '../books/book.service';
import { EditBookDto } from '../books/dto/editBookDto';
import { CreateBookDto } from '../books/dto/createBookDto';
import { API_PREFIX } from '../comun/const';
import { FavoritesService } from './favorites.service';
import { FindBooksDto } from './dto/FindBooksDto';

@Controller(API_PREFIX + 'book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly favoriteService: FavoritesService
  ) {}

  @Patch()
  edit(@Body() request: EditBookDto) {
    return this.bookService.editBook(request);
  }

  @Post()
  create(@Body() request: CreateBookDto) {
    return this.bookService.addBook(request);
  }

  @Post()
  findBooks(@Body() request: FindBooksDto) {
    return this.favoriteService.findBooks(request);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
