/* tslint:disable */
/* eslint-disable */
import { ApproachType } from './approach-type';
import { Department } from './department';
import { Engagement } from './engagement';
import { Equipment } from './equipment';
import { Level } from './level';
import { Region } from './region';
import { RockType } from './rock-type';
export interface SiteCreateDto {
  approachTime: number;
  approachType: ApproachType;
  averageRouteHeight: number;
  averageRouteNumber: number;
  department: Department;
  engagement: Engagement;
  equipment: Equipment;
  expositions: Array<string>;
  mainParkingLat: number;
  mainParkingLng: number;
  maxLevel: Level;
  minLevel: Level;
  name: string;
  network: boolean;
  region: Region;
  river: boolean;
  rockType: RockType;
  routeProfiles: Array<string>;
  secondaryParkingLat: number;
  secondaryParkingLng: number;
  secteurs: Array<string>;
  water: boolean;
  wc: boolean;
}
