/* tslint:disable */
/* eslint-disable */
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { LevelDto } from './level-dto';
import { SecteurDto } from './secteur-dto';
export interface RouteListDto {
  engagement: EngagementDto;
  equipment: EquipmentDto;
  height: number;
  id: number;
  level: LevelDto;
  name: string;
  quickdraw: number;
  secteur: SecteurDto;
}
