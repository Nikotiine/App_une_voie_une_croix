/* tslint:disable */
/* eslint-disable */
import { ExpositionsDto } from './expositions-dto';
import { Level } from './level';
export interface SiteListDto {
  approachTime: number;
  averageRouteHeight: number;
  averageRouteNumber: number;
  department: string;
  expositions: Array<ExpositionsDto>;
  id: number;
  maxLevel: Level;
  minLevel: Level;
  name: string;
  region: string;
}
