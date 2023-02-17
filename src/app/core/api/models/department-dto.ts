/* tslint:disable */
/* eslint-disable */
import { RegionDto } from './region-dto';
export interface DepartmentDto {
  id: number;
  lat: number;
  lng: number;
  name: string;
  region: RegionDto;
}
