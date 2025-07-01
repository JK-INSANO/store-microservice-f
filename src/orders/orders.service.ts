import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus, DeliveryMethod } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { QueryOrderDto } from './dto/query-order.dto';
import { PaginationDto, PaginationResponseDto } from '../common/dto/pagination.dto';
import { ProductsService } from '../products/products.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    console.log('Iniciando creación de orden con items:', JSON.stringify(createOrderDto.items));
    
    // Verificar stock y actualizar inventario
    for (const item of createOrderDto.items) {
      console.log(`Procesando item: ${item.id}, cantidad: ${item.quantity}`);
      
      const product = await this.productsService.findOne(item.id);
      console.log(`Stock actual del producto ${product.name}: ${product.stock}`);
      
      // Verificar si hay suficiente stock
      if (product.stock < item.quantity) {
        console.log(`Stock insuficiente para ${product.name}`);
        throw new BadRequestException(
          `No hay suficiente stock para el producto ${product.name}. Disponible: ${product.stock}, Solicitado: ${item.quantity}`
        );
      }
      
      // Actualizar el stock del producto
      const newStock = product.stock - item.quantity;
      console.log(`Actualizando stock de ${product.name} a: ${newStock}`);
      
      await this.productsService.update(item.id, {
        stock: newStock
      });
      
      // Verificar que el stock se actualizó correctamente
      const updatedProduct = await this.productsService.findOne(item.id);
      console.log(`Stock actualizado de ${updatedProduct.name}: ${updatedProduct.stock}`);
    }
    
    console.log('Todos los productos procesados, creando orden');
    
    // Crear la orden
    const createdOrder = new this.orderModel(createOrderDto);
    return createdOrder.save();
  }

  async findAll(queryDto: QueryOrderDto): Promise<{
    data: Order[];
    pagination: PaginationResponseDto;
  }> {
    const { page = 1, limit = 10, status } = queryDto;
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    
    if (status) {
      filter.status = status;
    }

    // Execute queries
    const [data, total] = await Promise.all([
      this.orderModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.orderModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(
        id, 
        { 
          status: updateOrderStatusDto.status,
          ...(updateOrderStatusDto.notes && { notes: updateOrderStatusDto.notes })
        }, 
        { new: true }
      )
      .exec();
    
    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    
    return updatedOrder;
  }

  async getPendingOrdersCount(): Promise<number> {
    return this.orderModel.countDocuments({ status: OrderStatus.PENDING }).exec();
  }

  async getCompletedOrdersCount(): Promise<number> {
    return this.orderModel.countDocuments({ status: OrderStatus.DELIVERED }).exec();
  }

  async getTotalRevenue(): Promise<number> {
    const result = await this.orderModel.aggregate([
      { $match: { status: OrderStatus.DELIVERED } },
      { $group: { _id: null, total: { $sum: '$total' } } },
    ]);
    
    return result.length > 0 ? result[0].total : 0;
  }

  async getAvailableForDelivery(queryDto: PaginationDto): Promise<{
    data: Order[];
    pagination: PaginationResponseDto;
  }> {
    const { page = 1, limit = 10 } = queryDto;
    const skip = (page - 1) * limit;

    // Filtrar órdenes que están en READY_FOR_PICKUP y tienen método de entrega "delivery"
    const filter = {
      status: OrderStatus.READY_FOR_PICKUP,
      deliveryMethod: DeliveryMethod.DELIVERY,
    };

    // Ejecutar consultas
    const [data, total] = await Promise.all([
      this.orderModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: 1 }) // Primero las más antiguas
        .exec(),
      this.orderModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }

  async getDeliveryOrders(deliveryId: string, queryDto: PaginationDto): Promise<{
    data: Order[];
    pagination: PaginationResponseDto;
  }> {
    const { page = 1, limit = 10 } = queryDto;
    const skip = (page - 1) * limit;

    // Filtrar órdenes asignadas al repartidor y que están en tránsito o entregadas
    const filter = {
      deliveryId: deliveryId,
      status: { $in: [OrderStatus.IN_TRANSIT, OrderStatus.DELIVERED] }
    };

    // Ejecutar consultas
    const [data, total] = await Promise.all([
      this.orderModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ updatedAt: -1 }) // Más recientes primero
        .exec(),
      this.orderModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}

