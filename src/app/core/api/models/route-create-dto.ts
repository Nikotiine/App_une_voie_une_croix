/* tslint:disable */
/* eslint-disable */
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { LevelDto } from './level-dto';
import { SecteurDto } from './secteur-dto';
export interface RouteCreateDto {
  engagement: EngagementDto;
  equipment: EquipmentDto;
  height: number;
  level: LevelDto;
  name: string;
  quickdraw: number;
  secteur: SecteurDto;
}
