import { IsArray, IsNotEmpty, IsString, ArrayNotEmpty } from 'class-validator';

export class ModifyFavoriteDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  bookIds: string[];
}
