import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';

@ApiTags('dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get(':user_id')
  @ApiOperation({ summary: 'Obtener estadísticas de la tienda para un usuario' })
  @ApiParam({ name: 'user_id', description: 'ID del usuario' })
  @ApiResponse({ 
    status: 200, 
    description: 'Estadísticas obtenidas exitosamente',
    type: DashboardStatsDto,
  })
  getStatsForUser(@Param('user_id') user_id: string): Promise<DashboardStatsDto> {
    return this.dashboardService.getStatsForUser(user_id);
  }
}