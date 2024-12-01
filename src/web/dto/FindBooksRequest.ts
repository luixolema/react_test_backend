import { IsString, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class FindBooksRequest {
  @IsString()
  query: string;

  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  @Max(50)
  pageSize: number;

  @IsBoolean()
  favorites: boolean;
}
