/* tslint:disable */
/* eslint-disable */
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { SecteurSiteDto } from './secteur-site-dto';
export interface AdminRoutesDto {
  createdAt: string;
  exposition: ExpositionDto;
  height: number;
  id: number;
  isActive: boolean;
  level: LevelDto;
  name: string;
  secteur: SecteurSiteDto;
  updatedAt: string;
}
