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

  async getStats(): Promise<DashboardStatsDto> {
    const [
      totalProducts,
      pendingOrders,
      completedOrders,
      totalRevenue,
      averageRating,
    ] = await Promise.all([
      this.productsService.getTotalProducts(),
      this.ordersService.getPendingOrdersCount(),
      this.ordersService.getCompletedOrdersCount(),
      this.ordersService.getTotalRevenue(),
      this.reviewsService.getAverageRating(),
    ]);

    return {
      totalProducts,
      pendingOrders,
      completedOrders,
      totalRevenue,
      averageRating,
    };
  }
}
