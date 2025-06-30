import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsEmail } from 'class-validator';
import { OrderStatus } from '../schemas/order.schema';

export class UpdateOrderStatusDto {
  @ApiProperty({ 
    description: 'Nuevo estado del pedido',
    enum: OrderStatus,
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiPropertyOptional({ 
    description: 'ID del repartidor (cuando el estado es IN_TRANSIT)' 
  })
  @IsOptional()
  @IsString()
  deliveryId?: string;

  @ApiPropertyOptional({ 
    description: 'Nombre del repartidor' 
  })
  @IsOptional()
  @IsString()
  deliveryName?: string;

  @ApiPropertyOptional({ 
    description: 'Teléfono del repartidor' 
  })
  @IsOptional()
  @IsString()
  deliveryPhone?: string;

  @ApiPropertyOptional({ 
    description: 'Email del repartidor' 
  })
  @IsOptional()
  @IsEmail()
  deliveryEmail?: string;

  @ApiPropertyOptional({ 
    description: 'Notas adicionales sobre el cambio de estado' 
  })
  @IsOptional()
  @IsString()
  notes?: string;
}




