import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
  IsPositive,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { DeliveryMethod } from '../schemas/order.schema';

class CustomerDto {
  @ApiProperty({ description: 'Nombre del cliente' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Dirección del cliente' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Teléfono del cliente' })
  @IsString()
  phone: string;

  @ApiPropertyOptional({ description: 'Email del cliente' })
  @IsOptional()
  @IsEmail()
  email?: string;
}

class OrderItemDto {
  @ApiProperty({ description: 'ID del producto' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Cantidad', minimum: 1 })
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({ description: 'Precio unitario', minimum: 0 })
  @IsNumber()
  @IsPositive()
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Información del cliente' })
  @ValidateNested()
  @Type(() => CustomerDto)
  customer: CustomerDto;

  @ApiProperty({ description: 'Fecha del pedido (ISO string)' })
  @IsString()
  date: string;

  @ApiProperty({ description: 'Total del pedido', minimum: 0 })
  @IsNumber()
  @IsPositive()
  total: number;

  @ApiProperty({ 
    description: 'Método de entrega',
    enum: DeliveryMethod,
  })
  @IsEnum(DeliveryMethod)
  deliveryMethod: DeliveryMethod;

  @ApiProperty({ 
    description: 'Items del pedido',
    type: [OrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @ApiPropertyOptional({ description: 'Notas adicionales' })
  @IsOptional()
  @IsString()
  notes?: string;
}
