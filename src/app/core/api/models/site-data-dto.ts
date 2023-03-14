/* tslint:disable */
/* eslint-disable */
import { ApproachTypeListDto } from './approach-type-list-dto';
import { EngagementListDto } from './engagement-list-dto';
import { EquipmentListDto } from './equipment-list-dto';
import { ExpositionListDto } from './exposition-list-dto';
import { LevelListDto } from './level-list-dto';
import { RegionListDto } from './region-list-dto';
import { RockTypeListDto } from './rock-type-list-dto';
import { RouteProfileListDto } from './route-profile-list-dto';
export interface SiteDataDto {
  approachTypes: Array<ApproachTypeListDto>;
  engagements: Array<EngagementListDto>;
  equipments: Array<EquipmentListDto>;
  expositions: Array<ExpositionListDto>;
  levels: Array<LevelListDto>;
  regions: Array<RegionListDto>;
  rockTypes: Array<RockTypeListDto>;
  routeProfiles: Array<RouteProfileListDto>;
}
