/* tslint:disable */
/* eslint-disable */
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { SecteurDto } from './secteur-dto';
export interface RouteCreateDto {
  engagement: EngagementDto;
  equipment: EquipmentDto;
  exposition: ExpositionDto;
  height: number;
  level: LevelDto;
  name: string;
  quickdraw: number;
  secteur: SecteurDto;
}