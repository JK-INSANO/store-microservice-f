import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum DeliveryMethod {
  DELIVERY = 'delivery',
  PICKUP = 'pickup',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: {
      name: { type: String, required: true },
      address: { type: String },
      phone: { type: String, required: true },
      email: { type: String },
    },
    required: true,
  })
  customer: {
    name: string;
    address?: string;
    phone: string;
    email?: string;
  };

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  total: number;

  @Prop({ 
    type: String, 
    enum: OrderStatus, 
    default: OrderStatus.PENDING 
  })
  status: OrderStatus;

  @Prop({ 
    type: String, 
    enum: DeliveryMethod, 
    required: true 
  })
  deliveryMethod: DeliveryMethod;

  @Prop({
    type: [{
      id: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    }],
    required: true,
  })
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];

  @Prop()
  notes?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
