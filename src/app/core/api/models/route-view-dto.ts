/* tslint:disable */
/* eslint-disable */
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { RockTypeDto } from './rock-type-dto';
import { RouteProfileDto } from './route-profile-dto';
import { SecteurSiteDto } from './secteur-site-dto';
export interface RouteViewDto {
  commentary: string;
  createdAt: string;
  engagement: EngagementDto;
  equipment: EquipmentDto;
  exposition: ExpositionDto;
  height: number;
  id: number;
  level: LevelDto;
  name: string;
  quickdraw: number;
  rockType: RockTypeDto;
  routeProfile: RouteProfileDto;
  secteur: SecteurSiteDto;
}
