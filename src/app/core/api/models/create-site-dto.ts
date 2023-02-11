/* tslint:disable */
/* eslint-disable */
import { ApproachType } from './approach-type';
import { Engagement } from './engagement';
import { Equipment } from './equipment';
import { Level } from './level';
export interface CreateSiteDto {
  approachTime: number;
  approachType: ApproachType;
  averageRouteHeight: number;
  averageRouteNumber: number;
  engagement: Engagement;
  equipment: Equipment;
  mainParkingLat: string;
  mainParkingLng: string;
  maxLevel: Level;
  minLevel: Level;
  name: string;
  secondaryParkingLat: string;
  secondaryParkingLng: string;
}
