/* tslint:disable */
/* eslint-disable */
import { RouteDto } from './route-dto';
import { SiteDto } from './site-dto';
export interface PublicDataDto {
  lastRoute: RouteDto;
  lastSite: SiteDto;
  totalRoutes: number;
  totalSites: number;
  totalUsers: number;
}
