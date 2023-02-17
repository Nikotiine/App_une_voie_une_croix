/* tslint:disable */
/* eslint-disable */
import { DepartmentDto } from './department-dto';
import { ExpositionsDto } from './expositions-dto';
import { Level } from './level';
import { RegionDto } from './region-dto';
export interface SiteListDto {
  approachTime: number;
  averageRouteHeight: number;
  averageRouteNumber: number;
  department: DepartmentDto;
  expositions: Array<ExpositionsDto>;
  id: number;
  maxLevel: Level;
  minLevel: Level;
  name: string;
  region: RegionDto;
}
