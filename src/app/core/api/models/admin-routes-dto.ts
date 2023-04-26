/* tslint:disable */
/* eslint-disable */
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { SectorSiteDto } from './sector-site-dto';
import { UserProfileDto } from './user-profile-dto';
export interface AdminRoutesDto {
  author: UserProfileDto;
  createdAt: string;
  exposition: ExpositionDto;
  height: number;
  id: number;
  isActive: boolean;
  level: LevelDto;
  name: string;
  sector: SectorSiteDto;
  updatedAt: string;
}
