import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { ReviewsService } from '../reviews/reviews.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';

@Injectable()
export class DashboardService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly ordersService: OrdersService,
    private readonly reviewsService: ReviewsService,
  ) {}

  async getStatsForUser(user_id: string): Promise<DashboardStatsDto> {
    const [
      totalProducts,
      //pendingOrders,
      //completedOrders,
      //totalRevenue,
      //averageRating,
    ] = await Promise.all([
      this.productsService.getTotalProductsByUserId(user_id).then(products => products.length),
      //this.ordersService.getPendingOrdersCountByUserId(user_id),
      //this.ordersService.getCompletedOrdersCountByUserId(user_id),
      //this.ordersService.getTotalRevenueByUserId(user_id),
      //this.reviewsService.getAverageRatingByUserId(user_id),
    ]);

    return {
      totalProducts,
      //pendingOrders,
      //completedOrders,
      //totalRevenue,
      //averageRating,
    };
  }
}