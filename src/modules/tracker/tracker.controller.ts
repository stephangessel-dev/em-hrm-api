import { Controller, Get } from '@nestjs/common';
import { TrackerService } from './tracker.service';

@Controller('tracker')
export class TrackerController {
  constructor(private readonly trackerService: TrackerService) {}

  @Get('requests-count')
  getPatientsRequestsCount(): Record<string, number> {
    return this.trackerService.getPatientsRequestsCount();
  }
}
