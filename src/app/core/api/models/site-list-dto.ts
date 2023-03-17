/* tslint:disable */
/* eslint-disable */
import { DepartmentDataDto } from './department-data-dto';
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { RegionDto } from './region-dto';
export interface SiteListDto {
  approachTime: number;
  averageRouteHeight: number;
  averageRouteNumber: number;
  department: DepartmentDataDto;
  expositions: Array<ExpositionDto>;
  id: number;
  maxLevel: LevelDto;
  minLevel: LevelDto;
  name: string;
  region: RegionDto;
}
