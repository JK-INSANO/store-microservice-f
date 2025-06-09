import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsArray, IsOptional } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ description: 'Nombre del proveedor' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Persona de contacto' })
  @IsString()
  contactPerson: string;

  @ApiProperty({ description: 'Email del proveedor' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Teléfono del proveedor' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Dirección del proveedor' })
  @IsString()
  address: string;

  @ApiPropertyOptional({ description: 'Productos que ofrece el proveedor', type: [String] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  products?: string[] = [];
  
  // Eliminamos el campo storeId
}



