import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
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

@ApiTags('reviews')
@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todas las reseñas con paginación' })
  @ApiResponse({ status: 200, description: 'Lista de reseñas obtenida exitosamente' })
  @ApiQuery({ name: 'page', required: false, description: 'Número de página' })
  @ApiQuery({ name: 'limit', required: false, description: 'Elementos por página' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filtrar por producto' })
  findAll(@Query() queryDto: QueryReviewDto) {
    return this.reviewsService.findAll(queryDto);
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
