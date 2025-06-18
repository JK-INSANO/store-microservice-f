import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  ValidateNested,
  Min,
  IsPositive,
} from 'class-validator';

class DeliveryOptionsDto {
  @ApiPropertyOptional({ description: 'Disponible para entrega a domicilio' })
  @IsOptional()
  @IsBoolean()
  delivery?: boolean = false;

  @ApiPropertyOptional({ description: 'Disponible para recogida en tienda' })
  @IsOptional()
  @IsBoolean()
  pickup?: boolean = false;
}

class NutritionalInfoDto {
  @ApiPropertyOptional({ description: 'Calorías por porción' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  calories?: number;

  @ApiPropertyOptional({ description: 'Proteínas en gramos' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  protein?: number;

  @ApiPropertyOptional({ description: 'Carbohidratos en gramos' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  carbs?: number;

  @ApiPropertyOptional({ description: 'Grasas en gramos' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  fat?: number;
}

export class CreateProductDto {

  @ApiProperty({ description: 'ID del usuario' })
  @IsString()
  user_id: string;

  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Descripción del producto' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Precio del producto', minimum: 0 })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiPropertyOptional({ description: 'Stock disponible', minimum: 0, default: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  stock?: number = 0;

  @ApiPropertyOptional({ description: 'Categoría del producto' })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({ description: 'URL de la imagen del producto' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ description: 'Etiquetas del producto', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[] = [];

  @ApiPropertyOptional({ description: 'Opciones de entrega' })
  @IsOptional()
  @ValidateNested()
  @Type(() => DeliveryOptionsDto)
  deliveryOptions?: DeliveryOptionsDto;

  @ApiPropertyOptional({ description: 'Información nutricional' })
  @IsOptional()
  @ValidateNested()
  @Type(() => NutritionalInfoDto)
  nutritionalInfo?: NutritionalInfoDto;

  @ApiPropertyOptional({ description: 'Producto activo', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}
