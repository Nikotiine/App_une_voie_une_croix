/* tslint:disable */
/* eslint-disable */
import { DepartmentDataDto } from './department-data-dto';
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { RegionDto } from './region-dto';
export interface AdminSitesDto {
  approachTime: number;
  averageRouteHeight: number;
  averageRouteNumber: number;
  createdAt: string;
  department: DepartmentDataDto;
  expositions: Array<ExpositionDto>;
  id: number;
  isActive: boolean;
  maxLevel: LevelDto;
  minLevel: LevelDto;
  name: string;
  region: RegionDto;
  updatedAt: string;
}
