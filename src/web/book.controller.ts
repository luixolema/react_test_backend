import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BookService } from '../books/book.service';
import { EditBookDto } from '../books/dto/editBookDto';
import { CreateBookDto } from '../books/dto/createBookDto';
import { API_PREFIX } from '../comun/const';
import { FavoritesService } from './favorites.service';
import { FindBooksRequest } from './dto/FindBooksRequest';

@Controller(API_PREFIX + 'books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly favoriteService: FavoritesService,
  ) {}

  @Patch()
  edit(@Body() request: EditBookDto) {
    return this.bookService.editBook(request);
  }

  @Post()
  create(@Body() request: CreateBookDto) {
    return this.bookService.addBook(request);
  }

  @Post('/find')
  findBooks(@Body() request: FindBooksRequest) {
    return this.favoriteService.findBooks(request);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.bookService.remove(id);
  }

  @Get(':id')
  details(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }
}
