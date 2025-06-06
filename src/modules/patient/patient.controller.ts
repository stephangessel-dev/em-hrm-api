import { Controller, Get, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { HighHeartRateQueryDto } from './dto/hight-heart-rate.dto';
import { GenericResponseDto } from 'src/shared/dto/generic-response.dto';
import { HeartRateReadingDto } from './dto/hight-heart-rate-response.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('hight-heart-rates')
  getPatient(@Query() query: HighHeartRateQueryDto): GenericResponseDto<HeartRateReadingDto>[] {
    return this.patientService.getHightRateEvents(query.threshold);
  }
}
