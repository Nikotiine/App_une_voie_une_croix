/* tslint:disable */
/* eslint-disable */
import { DepartmentListDto } from './department-list-dto';
import { ExpositionListDto } from './exposition-list-dto';
import { Level } from './level';
import { RegionListDto } from './region-list-dto';
export interface SiteListDto {
  approachTime: number;
  averageRouteHeight: number;
  averageRouteNumber: number;
  department: DepartmentListDto;
  expositions: Array<ExpositionListDto>;
  id: number;
  maxLevel: Level;
  minLevel: Level;
  name: string;
  region: RegionListDto;
}
