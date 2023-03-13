/* tslint:disable */
/* eslint-disable */
import { ApproachTypeListDto } from './approach-type-list-dto';
import { DepartmentListDto } from './department-list-dto';
import { EngagementListDto } from './engagement-list-dto';
import { EquipmentListDto } from './equipment-list-dto';
import { ExpositionListDto } from './exposition-list-dto';
import { LevelListDto } from './level-list-dto';
import { RegionListDto } from './region-list-dto';
import { RockTypeListDto } from './rock-type-list-dto';
import { RouteProfileListDto } from './route-profile-list-dto';
export interface SiteCreateDto {
  approachTime: number;
  approachType: ApproachTypeListDto;
  averageRouteHeight: number;
  averageRouteNumber: number;
  department: DepartmentListDto;
  engagement: EngagementListDto;
  equipment: EquipmentListDto;
  expositions: Array<ExpositionListDto>;
  mainParkingLat: number;
  mainParkingLng: number;
  maxLevel: LevelListDto;
  minLevel: LevelListDto;
  name: string;
  network: boolean;
  region: RegionListDto;
  river: boolean;
  rockType: RockTypeListDto;
  routeProfiles: Array<RouteProfileListDto>;
  secondaryParkingLat: number;
  secondaryParkingLng: number;
  secteurs: Array<string>;
  water: boolean;
  wc: boolean;
}
