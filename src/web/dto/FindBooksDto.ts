import { IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class FindBooksDto {
  @IsString()
  query: string;

  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  @Max(50)
  pageSize: number;

  @IsInt()
  @Min(1)
  @Max(100)
  limit: number;

  @IsBoolean()
  favorites: boolean;
}
