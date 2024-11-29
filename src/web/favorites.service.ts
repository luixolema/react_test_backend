import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { BookService } from '../books/book.service';
import { FindBooksDto } from './dto/FindBooksDto';
import { AuthService } from '../auth/auth.service';

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

  findBooks(request: FindBooksDto) {
    return this.bookService.findBook(
      request,
      request.favorites ? this.auth.getLongedUser().favoriteBooks : [],
    );
  }
}
