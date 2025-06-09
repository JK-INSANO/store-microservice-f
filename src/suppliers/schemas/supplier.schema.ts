import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SupplierDocument = Supplier & Document;

@Schema({ timestamps: true })
export class Supplier {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  contactPerson: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  address: string;

  @Prop({ type: [String], default: [] })
  products: string[];
  
  // Eliminamos el campo storeId requerido
  // MongoDB ya generará un _id automáticamente
}

export const SupplierSchema = SchemaFactory.createForClass(Supplier);



