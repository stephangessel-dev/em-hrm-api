import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import mockData from '../../../data/mock-data.json';
import { TrackerService } from '../tracker/tracker.service';
import { GenericResponseDto } from 'src/shared/dto/generic-response.dto';
import { HeartRateReadingDto } from './dto/hight-heart-rate-response.dto';

@Injectable()
export class PatientService {
  private heartRateReadings = mockData.heartRateReadings;
  private patients = mockData.patients;

  constructor(private readonly trackerService: TrackerService) {}

      /**
     * Retrieves all heart rate events where the patient's heart rate exceeds the given threshold.
     * Validates the threshold and tracks the request count per patient using TrackerService.
     *
     * @param threshold - (Optional) The heart rate threshold (default is 100). Must be a number between 0 and 300.
     * @returns An array of high heart rate events matching the threshold.
     *
     * @throws {BadRequestException} If the threshold is not a valid number in the expected range.
     * @throws {InternalServerErrorException} If an error occurs while processing heart rate data.
     */
    getHightRateEvents(threshold: number = 100): GenericResponseDto<HeartRateReadingDto>[] {
      if (isNaN(threshold) || threshold < 0 || threshold > 300) {
        throw new BadRequestException('Threshold must be a valid number between 0 and 300');
      }

      // Events filtering depending on threshold.
      try {
        // Map for batter performance in large set of patients
        const patientMap = new Map(this.patients.map(p => [p.id, p]));

        const highRateEvents = this.heartRateReadings.filter(
          (reading) => reading.heartRate > threshold,
        );

        const resultMap = new Map();

        for (const reading of highRateEvents) {
          const patient = patientMap.get(reading.patientId);
          if (!patient) continue;

          if (!resultMap.has(patient.id)) {
            resultMap.set(patient.id, {
              patient,
              data: [],
            });
          }

          // Removing unnecessary patientId
          const { patientId, ...readingWithoutPatientId } = reading;
          
          resultMap.get(patient.id).data.push(readingWithoutPatientId);
        }

        const result = Array.from(resultMap.values());

        // Track requests per patient based on the result array
        result.forEach(({ patient }) => {
          this.trackerService.increment(patient.id);
        });

        return result;
      } catch (error) {
          console.error('Failed to process heart rate data:', error);
          throw new InternalServerErrorException('Failed to process heart rate data');
      }
    }
}
