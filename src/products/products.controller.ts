import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los productos con paginación' })
  @ApiResponse({ status: 200, description: 'Lista de productos obtenida exitosamente' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por página' })
  @ApiQuery({ name: 'search', required: false, description: 'Buscar por nombre' })
  @ApiQuery({ name: 'category', required: false, description: 'Filtrar por categoría' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filtrar por estado activo' })
  findAll(@Query() queryDto: QueryProductDto) {
    return this.productsService.findAll(queryDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de un producto específico' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto encontrado' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('user/:user_id')
  @ApiOperation({ summary: 'Obtener todos los productos de un usuario específico' })
  @ApiParam({ name: 'user_id', description: 'ID del usuario' })
  @ApiResponse({ status: 200, description: 'Productos encontrados' })
  @ApiResponse({ status: 404, description: 'No se encontraron productos' })
  findByUserId(@Param('user_id') user_id: string) {
    return this.productsService.findByUserId(user_id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
