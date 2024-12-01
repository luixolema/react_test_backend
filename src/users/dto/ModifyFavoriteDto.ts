import { IsArray, IsString, ArrayNotEmpty } from 'class-validator';

export class ModifyFavoriteDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  bookIds: string[];
}
