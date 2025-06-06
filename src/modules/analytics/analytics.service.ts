import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import mockData from '../../../data/mock-data.json';
import { TrackerService } from '../tracker/tracker.service';
import { GenericResponseDto } from 'src/shared/dto/generic-response.dto';
import { HeartRateAvgDto } from './dto/heart-rate-analytics-response.dto';

@Injectable()
export class AnalyticsService {
  private heartRateReadings = mockData.heartRateReadings;
  private patients = mockData.patients;

  constructor(private readonly trackerService: TrackerService) {}

  /**
   * Calculates heart rate analytics (average, min, max) for each patient within a given time range.
   * Validates input timestamps and tracks analytics requests per patient using TrackerService.
   *
   * @param startTime - The start of the time range as an ISO date string.
   * @param endTime - The end of the time range as an ISO date string.
   * @returns An array of heart rate analytics results for each patient.
   *
   * @throws {BadRequestException} If either time is invalid or if the start time is after the end time.
   * @throws {InternalServerErrorException} If an error occurs while processing analytics data.
   */
  getHeartRateAnalytics(startTime: string, endTime: string): GenericResponseDto<HeartRateAvgDto>[] {
    const start = new Date(startTime);
    const end = new Date(endTime);

    // Validate time range inputs
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new BadRequestException('Start time and end time must be valid ISO date strings');
    }
    if (start > end) {
      throw new BadRequestException('Start time must be before end time');
    }

    // Avg, min and max calculation.
    try {
      // Map for better performance with large sets of patients
      const patientMap = new Map(this.patients.map(p => [p.id, p]));
      const analyticsMap = new Map<string, number[]>();

      for (const reading of this.heartRateReadings) {
        const time = new Date(reading.timestamp);
        if (time >= start && time <= end) {
          if (!analyticsMap.has(reading.patientId)) {
            analyticsMap.set(reading.patientId, []);
          }
          analyticsMap.get(reading.patientId)!.push(reading.heartRate);
        }
      }

      const result: GenericResponseDto<HeartRateAvgDto>[] = [];

      for (const [patientId, rates] of analyticsMap.entries()) {
        const patient = patientMap.get(patientId);
        if (!patient) continue;

        const total = rates.reduce((a, b) => a + b, 0);
        const average = total / rates.length;
        const data = {
          average: Number(average.toFixed(1)),
          max: Math.max(...rates),
          min: Math.min(...rates)
        }

        result.push({
          patient,
          data
        });

        // Track patient usage
        this.trackerService.increment(patientId);
      }

      return result;
    } catch (error) {
        console.error('Error calculating heart rate analytics:', error);
        throw new InternalServerErrorException('Failed to calculate heart rate analytics');
    }
  }
}
