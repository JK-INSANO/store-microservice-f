import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ProductsModule } from '../products/products.module';
import { OrdersModule } from '../orders/orders.module';
import { ReviewsModule } from '../reviews/reviews.module';

@Module({
  imports: [ProductsModule, OrdersModule, ReviewsModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
