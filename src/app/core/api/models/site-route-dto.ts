/* tslint:disable */
/* eslint-disable */
import { LevelDto } from './level-dto';
import { SecteurDto } from './secteur-dto';
export interface SiteRouteDto {
  height: number;
  id: number;
  level: LevelDto;
  name: string;
  secteur: SecteurDto;
}
