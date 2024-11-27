import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { BookService } from '../books/book.service';

@Injectable()
export class FavoritesService {
  constructor(
    private userService: UserService,
    private bookService: BookService,
  ) {}

  async getFavoriteBooks(userId: string) {
    const booksIds = await this.userService.getFavoriteBooksIds(userId);
    return this.bookService.getBooks(booksIds);
  }
}
