import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { ModifyFavoriteDto } from '../users/dto/ModifyFavoriteDto';
import { FavoritesService } from './favorites.service';
import { CreateUserDto } from '../users/dto/CreateUserDto';
import { API_PREFIX } from '../comun/const';
import { FindBooksDto } from './dto/FindBooksDto';

@Controller(API_PREFIX + 'user')
export class UserController {
  constructor(
    private readonly favoriteService: FavoritesService,
    private userService: UserService,
  ) {}

  @Get(':id/books')
  getUserFavoriteBooks(@Param('id') id: string) {
    return this.favoriteService.getFavoriteBooks(id);
  }

  @Delete('/favorites')
  removeFavoriteBooks(@Body() request: ModifyFavoriteDto) {
    return this.userService.removeFavorites(request);
  }

  @Post('/favorites')
  addFavoriteBooks(@Body() request: ModifyFavoriteDto) {
    return this.userService.addFavorites(request);
  }

  @Post()
  addUser(@Body() request: CreateUserDto) {
    return this.userService.create(request);
  }
}
