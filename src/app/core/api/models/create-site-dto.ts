/* tslint:disable */
/* eslint-disable */
import { ApproachType } from './approach-type';
import { Engagement } from './engagement';
import { Equipment } from './equipment';
import { Level } from './level';
import { RockType } from './rock-type';
export interface CreateSiteDto {
  approachTime: number;
  approachType: ApproachType;
  averageRouteHeight: number;
  averageRouteNumber: number;
  department: string;
  engagement: Engagement;
  equipment: Equipment;
  expositions: Array<string>;
  mainParkingLat: string;
  mainParkingLng: string;
  maxLevel: Level;
  minLevel: Level;
  name: string;
  network: boolean;
  region: string;
  river: boolean;
  rockType: RockType;
  routeProfiles: Array<string>;
  secondaryParkingLat: string;
  secondaryParkingLng: string;
  secteurs: Array<string>;
  water: boolean;
  wc: boolean;
}
