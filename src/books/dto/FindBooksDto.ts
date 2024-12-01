import { IsString, IsInt, Min, Max } from 'class-validator';

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
}
