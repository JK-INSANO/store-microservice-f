import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './schemas/review.schema';
import { ReplyReviewDto } from './dto/reply-review.dto';
import { QueryReviewDto } from './dto/query-review.dto';
import { PaginationResponseDto } from '../common/dto/pagination.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name) private reviewModel: Model<ReviewDocument>,
  ) {}

  async findAll(queryDto: QueryReviewDto): Promise<{
    data: Review[];
    pagination: PaginationResponseDto;
  }> {
    const { page = 1, limit = 10, productId } = queryDto;
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    
    if (productId) {
      filter.productId = productId;
    }

    // Execute queries
    const [data, total] = await Promise.all([
      this.reviewModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ reviewDate: -1 })
        .exec(),
      this.reviewModel.countDocuments(filter).exec(),
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

  async findOne(id: string): Promise<Review> {
    const review = await this.reviewModel.findById(id).exec();
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }

  async reply(id: string, replyReviewDto: ReplyReviewDto): Promise<Review> {
    const updatedReview = await this.reviewModel
      .findByIdAndUpdate(
        id,
        {
          reply: replyReviewDto.reply,
          replyDate: new Date(),
        },
        { new: true }
      )
      .exec();
    
    if (!updatedReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    
    return updatedReview;
  }

  async getAverageRating(): Promise<number> {
    const result = await this.reviewModel.aggregate([
      { $group: { _id: null, averageRating: { $avg: '$rating' } } },
    ]);
    
    return result.length > 0 ? Math.round(result[0].averageRating * 10) / 10 : 0;
  }
}
