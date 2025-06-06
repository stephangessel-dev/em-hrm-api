import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { HeartRateAnalyticsDto } from './dto/heart-rate-analytics.dto';
import { GenericResponseDto } from 'src/shared/dto/generic-response.dto';
import { HeartRateAvgDto } from './dto/heart-rate-analytics-response.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('heart-rate-analytics')
  getHeartRateAnalytics(@Query() query: HeartRateAnalyticsDto): GenericResponseDto<HeartRateAvgDto>[] {
    return this.analyticsService.getHeartRateAnalytics(query.startTime, query.endTime);
  }
}
