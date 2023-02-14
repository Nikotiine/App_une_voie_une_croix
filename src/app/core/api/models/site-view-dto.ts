/* tslint:disable */
/* eslint-disable */
import { ApproachTypeDto } from './approach-type-dto';
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { ExpositionsDto } from './expositions-dto';
import { Level } from './level';
import { RockTypeDto } from './rock-type-dto';
import { RouteProfileDto } from './route-profile-dto';
import { SecteurDto } from './secteur-dto';
export interface SiteViewDto {
  approachTime: number;
  approachType: ApproachTypeDto;
  averageRouteHeight: number;
  averageRouteNumber: number;
  engagement: EngagementDto;
  equipment: EquipmentDto;
  expositions: Array<ExpositionsDto>;
  id: number;
  mainParking: string;
  maxLevel: Level;
  minLevel: Level;
  name: string;
  network: boolean;
  river: boolean;
  rockType: RockTypeDto;
  routeProfiles: Array<RouteProfileDto>;
  secondaryParking: string;
  secteurs: Array<SecteurDto>;
  water: boolean;
  wc: boolean;
  zipCode: string;
}
