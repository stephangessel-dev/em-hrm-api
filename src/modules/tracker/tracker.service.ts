import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackerService {
  private requestCounts = new Map<string, number>();

  /**
   * Increment request count for a given patient ID.
   * @param patientId - Unique identifier for a patient.
   */
  increment(patientId: string) {
    if (!patientId) {
      throw new Error('Patient ID must be provided');
    }
    const currentCount = this.requestCounts.get(patientId) ?? 0;
    this.requestCounts.set(patientId, currentCount + 1);
  }

    /**
   * Get a snapshot of request counts for all patients.
   * @returns An object mapping patient IDs to their request counts.
   */
    getPatientsRequestsCount(): Readonly<Record<string, number>> {
      return Object.freeze(Object.fromEntries(this.requestCounts.entries()));
    }
}
