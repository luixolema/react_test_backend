import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class EditBookDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsOptional()
  publishDate?: Date;
}
