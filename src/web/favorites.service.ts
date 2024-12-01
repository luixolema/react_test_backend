import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { BookService } from '../books/book.service';
import { FindBooksRequest } from './dto/FindBooksRequest';
import { AuthService } from '../auth/auth.service';
import ClassValidator from '../comun/ClassValidator';
import { PageResponse } from '../comun/data/abstract.respository';
import { BooksWithFavorite } from './dto/FindBooksResponse';
import { Book } from '../books/book.schema';

@Injectable()
export class FavoritesService {
  constructor(
    private userService: UserService,
    private bookService: BookService,
    private auth: AuthService,
  ) {}

  async getFavoriteBooks(userId: string) {
    const booksIds = await this.userService.getFavoriteBooksIds(userId);
    return this.bookService.getBooks(booksIds);
  }

  async findBooks(
    request: FindBooksRequest,
  ): Promise<PageResponse<BooksWithFavorite>> {
    await ClassValidator.validate(request);
    const favoriteBooks = this.auth.getLongedUser()?.favoriteBooks || [];
    const data = await this.bookService.findBook(
      request,
      request.favorites ? favoriteBooks : [],
    );

    const items = data.items.map(
      (book: Book): BooksWithFavorite => ({
        favorite: favoriteBooks.includes(book._id.toString()),
        _id: book._id.toString(),
        title: book.title,
        description: book.description,
        author: book.author,
        publishDate: book.publishDate.toISOString(),
      }),
    );

    return { ...data, items };
  }

  async findBook(id: string): Promise<BooksWithFavorite> {
    const favoriteBooks = this.auth.getLongedUser()?.favoriteBooks || [];
    const book = await this.bookService.findOne(id);
    return {
      favorite: favoriteBooks.includes(book._id.toString()),
      _id: book._id.toString(),
      title: book.title,
      description: book.description,
      author: book.author,
      publishDate: book.publishDate.toISOString(),
    };
  }
}
