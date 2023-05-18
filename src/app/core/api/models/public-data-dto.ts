/* tslint:disable */
/* eslint-disable */
import { RouteListDto } from './route-list-dto';
import { SiteListDto } from './site-list-dto';
export interface PublicDataDto {
  lastFiveRoute: Array<RouteListDto>;
  lastFiveSite: Array<SiteListDto>;
  totalRoutes: number;
  totalSites: number;
  totalUsers: number;
}
