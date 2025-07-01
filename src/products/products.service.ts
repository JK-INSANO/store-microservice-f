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
    console.log(`ProductsService.findOne - Buscando producto con ID: ${id}`);
    
    const product = await this.productModel.findById(id).exec();
    
    if (!product) {
      console.log(`ProductsService.findOne - Producto no encontrado con ID: ${id}`);
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    console.log(`ProductsService.findOne - Producto encontrado: ${product.name}, Stock: ${product.stock}`);
    return product;
  }

  async findByUserId(user_id: string): Promise<Product[]> {
    const products = await this.productModel.find({ user_id }).exec();
    return products;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    console.log(`ProductsService.update - ID: ${id}, Data:`, JSON.stringify(updateProductDto));
    
    // Verificar el producto antes de actualizar
    const currentProduct = await this.productModel.findById(id).exec();
    console.log(`Producto antes de actualizar - ID: ${id}, Stock actual: ${currentProduct?.stock}`);
    
    if (!currentProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    
    console.log(`Producto después de actualizar - ID: ${id}, Nuevo stock: ${updatedProduct?.stock}`);
    
    // The non-null assertion operator (!) tells TypeScript that we're certain
    // updatedProduct is not null at this point (because we checked earlier)
    return updatedProduct!;
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
