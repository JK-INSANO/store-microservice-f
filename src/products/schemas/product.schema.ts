import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  stock: number;

  @Prop()
  category: string;

  @Prop()
  image: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({
    type: {
      delivery: { type: Boolean, default: false },
      pickup: { type: Boolean, default: false },
    },
    default: { delivery: false, pickup: false },
  })
  deliveryOptions: {
    delivery: boolean;
    pickup: boolean;
  };

  @Prop({
    type: {
      calories: { type: Number },
      protein: { type: Number },
      carbs: { type: Number },
      fat: { type: Number },
    },
    required: false,
  })
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };

  @Prop({ default: true })
  isActive: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
