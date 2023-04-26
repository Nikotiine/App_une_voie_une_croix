/* tslint:disable */
/* eslint-disable */
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { SectorSiteDto } from './sector-site-dto';
export interface RouteListDto {
  createdAt: string;
  exposition: ExpositionDto;
  height: number;
  id: number;
  level: LevelDto;
  name: string;
  sector: SectorSiteDto;
}
