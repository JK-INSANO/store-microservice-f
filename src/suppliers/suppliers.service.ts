import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier, SupplierDocument } from './schemas/supplier.schema';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { QuerySupplierDto } from './dto/query-supplier.dto';
import { PaginationResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectModel(Supplier.name) private supplierModel: Model<SupplierDocument>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const createdSupplier = new this.supplierModel(createSupplierDto);
    return createdSupplier.save();
  }

  async findAll(queryDto: QuerySupplierDto): Promise<{
    data: Supplier[];
    pagination: PaginationResponseDto;
  }> {
    const { page = 1, limit = 10, search, user_id } = queryDto;
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    
    // Añadir filtro por user_id si está presente
    if (user_id) {
      filter.user_id = user_id;
    }

    // Execute queries
    const [data, total] = await Promise.all([
      this.supplierModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.supplierModel.countDocuments(filter).exec(),
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

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.supplierModel.findById(id).exec();
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const updatedSupplier = await this.supplierModel
      .findByIdAndUpdate(id, updateSupplierDto, { new: true })
      .exec();
    
    if (!updatedSupplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    
    return updatedSupplier;
  }

  async remove(id: string): Promise<void> {
    const result = await this.supplierModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
  }

  // Añadir método para buscar proveedores por user_id
  async findByUserId(user_id: string): Promise<Supplier[]> {
    return this.supplierModel.find({ user_id }).exec();
  }
}



