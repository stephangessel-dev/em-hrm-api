import { PatientDto } from "./patient.dto";

export class GenericResponseDto<T> {
  patient: PatientDto;
  data: T[] | T;
}