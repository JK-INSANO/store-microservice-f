import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Número de página',
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Número de elementos por página',
    minimum: 1,
    maximum: 100,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Min(1)
  limit?: number = 10;
}

export class PaginationResponseDto {
  @ApiPropertyOptional({
    description: 'Página actual',
  })
  page: number;

  @ApiPropertyOptional({
    description: 'Elementos por página',
  })
  limit: number;

  @ApiPropertyOptional({
    description: 'Total de elementos',
  })
  total: number;

  @ApiPropertyOptional({
    description: 'Total de páginas',
  })
  totalPages: number;

  @ApiPropertyOptional({
    description: 'Tiene página siguiente',
  })
  hasNext: boolean;

  @ApiPropertyOptional({
    description: 'Tiene página anterior',
  })
  hasPrev: boolean;
}
