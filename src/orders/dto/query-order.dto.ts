import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { OrderStatus } from '../schemas/order.schema';

export class QueryOrderDto extends PaginationDto {
  @ApiPropertyOptional({ 
    description: 'Filtrar por estado del pedido',
    enum: OrderStatus,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
