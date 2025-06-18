import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { PaginationResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(queryDto: QueryProductDto): Promise<{
    data: Product[];
    pagination: PaginationResponseDto;
  }> {
    const { page = 1, limit = 10, search, category, isActive } = queryDto;
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    
    if (category) {
      filter.category = category;
    }
    
    if (isActive !== undefined) {
      filter.isActive = isActive;
    }

    // Execute queries
    const [data, total] = await Promise.all([
      this.productModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .exec(),
      this.productModel.countDocuments(filter).exec(),
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

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async findByUserId(user_id: string): Promise<Product[]> {
    const products = await this.productModel.find({ user_id }).exec();
    return products;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async getTotalProducts(): Promise<number> {
    return this.productModel.countDocuments({ isActive: true }).exec();
  }

  async getTotalProductsByUserId(user_id: string): Promise<Product[]> {
    const products = await this.productModel.find({ user_id }).exec();
    if (!products) {
      throw new NotFoundException(`No products found for user ID ${user_id}`);
    }
    return products;
  }
}
