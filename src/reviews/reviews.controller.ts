import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { ReviewsService } from './reviews.service';
import { ReplyReviewDto } from './dto/reply-review.dto';
import { QueryReviewDto } from './dto/query-review.dto';
import { CreateReviewDto } from './dto/create-review.dto';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reseña' })
  @ApiResponse({ status: 201, description: 'Reseña creada exitosamente' })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewsService.create(createReviewDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las reseñas con paginación' })
  @ApiResponse({ status: 200, description: 'Lista de reseñas obtenida exitosamente' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por página' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filtrar por producto' })
  findAll(@Query() queryDto: QueryReviewDto) {
    return this.reviewsService.findAll(queryDto);
  }

  @Get('product/:productId')
  @ApiOperation({ summary: 'Obtener reseñas de un producto específico' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Reseñas encontradas' })
  findByProductId(@Param('productId') productId: string) {
    return this.reviewsService.findByProductId(productId);
  }

  @Get('store/:storeId')
  @ApiOperation({ summary: 'Obtener reseñas de una tienda específica' })
  @ApiParam({ name: 'storeId', description: 'ID de la tienda (user_id)' })
  @ApiResponse({ status: 200, description: 'Reseñas encontradas' })
  findByStoreId(
    @Param('storeId') storeId: string,
    @Query() queryDto: QueryReviewDto
  ) {
    return this.reviewsService.findByStoreId(storeId, queryDto);
  }

  @Get('product/:productId/rating')
  @ApiOperation({ summary: 'Obtener calificación promedio de un producto' })
  @ApiParam({ name: 'productId', description: 'ID del producto' })
  @ApiResponse({ status: 200, description: 'Calificación promedio obtenida' })
  getProductRating(@Param('productId') productId: string) {
    return this.reviewsService.getProductAverageRating(productId);
  }

  @Get('store/:storeId/rating')
  @ApiOperation({ summary: 'Obtener calificación promedio de una tienda' })
  @ApiParam({ name: 'storeId', description: 'ID de la tienda (user_id)' })
  @ApiResponse({ status: 200, description: 'Calificación promedio obtenida' })
  getStoreRating(@Param('storeId') storeId: string) {
    return this.reviewsService.getStoreAverageRating(storeId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener detalles de una reseña específica' })
  @ApiParam({ name: 'id', description: 'ID de la reseña' })
  @ApiResponse({ status: 200, description: 'Reseña encontrada' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  findOne(@Param('id') id: string) {
    return this.reviewsService.findOne(id);
  }

  @Patch(':id/reply')
  @ApiOperation({ summary: 'Responder a una reseña' })
  @ApiParam({ name: 'id', description: 'ID de la reseña' })
  @ApiResponse({ status: 200, description: 'Respuesta agregada exitosamente' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  reply(@Param('id') id: string, @Body() replyReviewDto: ReplyReviewDto) {
    return this.reviewsService.reply(id, replyReviewDto);
  }
}
