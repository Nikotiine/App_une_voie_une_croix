/* tslint:disable */
/* eslint-disable */
import { RegionListDto } from './region-list-dto';
export interface DepartmentListDto {
  id: number;
  lat: number;
  lng: number;
  name: string;
  region: RegionListDto;
}
