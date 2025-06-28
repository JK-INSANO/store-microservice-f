import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema({ timestamps: true })
export class Review {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  productName: string;

  @Prop({ required: true })
  store_name: string;

  @Prop({ required: true })
  store_id: string;  // ID del dueño de la tienda (user_id)

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  comment: string;

  @Prop()
  reply?: string;

  @Prop({ default: Date.now })
  reviewDate: Date;

  @Prop()
  replyDate?: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
