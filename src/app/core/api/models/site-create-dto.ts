/* tslint:disable */
/* eslint-disable */
import { ApproachTypeDto } from './approach-type-dto';
import { DepartmentDto } from './department-dto';
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { ExpositionsDto } from './expositions-dto';
import { LevelsDto } from './levels-dto';
import { RegionDto } from './region-dto';
import { RockTypeDto } from './rock-type-dto';
import { RouteProfileDto } from './route-profile-dto';
export interface SiteCreateDto {
  approachTime: number;
  approachType: ApproachTypeDto;
  averageRouteHeight: number;
  averageRouteNumber: number;
  department: DepartmentDto;
  engagement: EngagementDto;
  equipment: EquipmentDto;
  expositions: Array<ExpositionsDto>;
  mainParkingLat: number;
  mainParkingLng: number;
  maxLevel: LevelsDto;
  minLevel: LevelsDto;
  name: string;
  network: boolean;
  region: RegionDto;
  river: boolean;
  rockType: RockTypeDto;
  routeProfiles: Array<RouteProfileDto>;
  secondaryParkingLat: number;
  secondaryParkingLng: number;
  secteurs: Array<string>;
  water: boolean;
  wc: boolean;
}
