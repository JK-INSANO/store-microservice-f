import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class QueryReviewDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Filtrar por ID del producto' })
  @IsOptional()
  @IsString()
  productId?: string;
}
