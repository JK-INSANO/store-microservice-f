import { ApiProperty } from '@nestjs/swagger';

export class DashboardStatsDto {
  @ApiProperty({ description: 'Total de productos activos' })
  totalProducts: number;

  //@ApiProperty({ description: 'Pedidos pendientes' })
  //pendingOrders: number;

  //@ApiProperty({ description: 'Pedidos completados' })
  //completedOrders: number;

  //@ApiProperty({ description: 'Ingresos totales' })
  //totalRevenue: number;

  //@ApiProperty({ description: 'Calificación promedio' })
  //averageRating: number;

  
}
