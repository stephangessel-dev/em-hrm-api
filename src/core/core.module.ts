import { Module } from '@nestjs/common';
import { AnalyticsModule } from 'src/modules/analytics/analytics.module';
import { PatientModule } from 'src/modules/patient/patient.module';
import { TrackerModule } from 'src/modules/tracker/tracker.module';

@Module({
  imports: [PatientModule, AnalyticsModule, TrackerModule]
})
export class CoreModule {}
