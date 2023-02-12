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
  engagement: Engagement;
  equipment: Equipment;
  expositions: Array<string>;
  mainParkingLat: string;
  mainParkingLng: string;
  maxLevel: Level;
  minLevel: Level;
  name: string;
  rockType: RockType;
  routeProfiles: Array<string>;
  secondaryParkingLat: string;
  secondaryParkingLng: string;
}
