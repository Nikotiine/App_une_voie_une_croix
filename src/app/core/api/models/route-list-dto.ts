/* tslint:disable */
/* eslint-disable */
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { SecteurSiteDto } from './secteur-site-dto';
export interface RouteListDto {
  createdAt: string;
  exposition: ExpositionDto;
  height: number;
  id: number;
  level: LevelDto;
  name: string;
  secteur: SecteurSiteDto;
}
