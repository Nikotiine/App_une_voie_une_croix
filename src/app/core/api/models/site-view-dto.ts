/* tslint:disable */
/* eslint-disable */
import { ApproachTypeDto } from './approach-type-dto';
import { DepartmentDataDto } from './department-data-dto';
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { RegionDto } from './region-dto';
import { RockTypeDto } from './rock-type-dto';
import { RouteFootDto } from './route-foot-dto';
import { RouteProfileDto } from './route-profile-dto';
import { SecteurDto } from './secteur-dto';
export interface SiteViewDto {
  approachTime: number;
  approachType: ApproachTypeDto;
  averageRouteHeight: number;
  averageRouteNumber: number;
  department: DepartmentDataDto;
  engagement: EngagementDto;
  equipment: EquipmentDto;
  expositions: Array<ExpositionDto>;
  id: number;
  mainParkingLat: number;
  mainParkingLng: number;
  maxLevel: LevelDto;
  minLevel: LevelDto;
  name: string;
  network: boolean;
  region: RegionDto;
  river: boolean;
  rockType: RockTypeDto;
  routeFoot: RouteFootDto;
  routeProfiles: Array<RouteProfileDto>;
  secondaryParkingLat: number;
  secondaryParkingLng: number;
  secteurs: Array<SecteurDto>;
  water: boolean;
  wc: boolean;
}
