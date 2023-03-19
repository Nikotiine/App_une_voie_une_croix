/* tslint:disable */
/* eslint-disable */
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { LevelDto } from './level-dto';
import { SecteurSiteDto } from './secteur-site-dto';
export interface RouteListDto {
  createdAt: string;
  engagement: EngagementDto;
  equipment: EquipmentDto;
  height: number;
  id: number;
  level: LevelDto;
  name: string;
  quickdraw: number;
  secteur: SecteurSiteDto;
}
