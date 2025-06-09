import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReplyReviewDto {
  @ApiProperty({ description: 'Respuesta a la reseña' })
  @IsString()
  reply: string;
}
