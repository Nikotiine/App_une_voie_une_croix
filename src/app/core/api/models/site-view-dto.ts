/* tslint:disable */
/* eslint-disable */
import { ApproachTypeDto } from './approach-type-dto';
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { ExpositionsDto } from './expositions-dto';
import { LevelsDto } from './levels-dto';
import { RockTypeDto } from './rock-type-dto';
import { RouteProfileDto } from './route-profile-dto';
import { SecteurDto } from './secteur-dto';
export interface SiteViewDto {
  approachTime: number;
  approachType: ApproachTypeDto;
  averageRouteHeight: number;
  averageRouteNumber: number;
  department: string;
  engagement: EngagementDto;
  equipment: EquipmentDto;
  expositions: Array<ExpositionsDto>;
  id: number;
  mainParking: string;
  maxLevel: LevelsDto;
  minLevel: LevelsDto;
  name: string;
  network: boolean;
  region: string;
  river: boolean;
  rockType: RockTypeDto;
  routeProfiles: Array<RouteProfileDto>;
  secondaryParking: string;
  secteurs: Array<SecteurDto>;
  water: boolean;
  wc: boolean;
}
