/* tslint:disable */
/* eslint-disable */
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { RockTypeDto } from './rock-type-dto';
import { RouteProfileDto } from './route-profile-dto';
import { SectorDto } from './sector-dto';
import { UserProfileDto } from './user-profile-dto';
export interface RouteCreateDto {
  author: UserProfileDto;
  commentary: string;
  effortType: null | 'Resi' | 'Bloc' | 'Conti';
  engagement: EngagementDto;
  equipment: EquipmentDto;
  exposition: ExpositionDto;
  height: number;
  level: LevelDto;
  name: string;
  quickdraw: number;
  rockType: RockTypeDto;
  routeProfile: RouteProfileDto;
  sector: SectorDto;
}
