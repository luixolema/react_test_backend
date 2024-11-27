import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { UserController } from './user.controller';
import { FavoritesService } from './favorites.service';
import { BooksModule } from '../books/books.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [BookController, UserController],
  providers: [FavoritesService],
  imports: [BooksModule, UsersModule],
})
export class WebModule {}
