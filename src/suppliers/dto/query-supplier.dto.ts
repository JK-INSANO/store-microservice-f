import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto';

export class QuerySupplierDto extends PaginationDto {
  @ApiPropertyOptional({ description: 'Buscar por nombre del proveedor' })
  @IsOptional()
  @IsString()
  search?: string;
  
  @ApiPropertyOptional({ description: 'ID del usuario propietario' })
  @IsOptional()
  @IsString()
  user_id?: string;
}




