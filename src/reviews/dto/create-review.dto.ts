import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({ description: 'Nombre del cliente que hace la reseña' })
  @IsString()
  @IsNotEmpty()
  customerName: string;

  @ApiProperty({ description: 'ID del producto' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty({ description: 'Nombre de la tienda' })
  @IsString()
  @IsNotEmpty()
  store_name: string;

  @ApiProperty({ description: 'ID del dueño de la tienda' })
  @IsString()
  @IsNotEmpty()
  store_id: string;

  @ApiProperty({ description: 'Calificación (1-5)', minimum: 1, maximum: 5 })
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({ description: 'Comentario de la reseña' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}