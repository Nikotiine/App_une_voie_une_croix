/* tslint:disable */
/* eslint-disable */
import { ApproachTypeDto } from './approach-type-dto';
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { RegionDto } from './region-dto';
import { RockTypeDto } from './rock-type-dto';
import { RouteProfileDto } from './route-profile-dto';
export interface DataSiteDto {
  approachTypes: Array<ApproachTypeDto>;
  engagements: Array<EngagementDto>;
  equipments: Array<EquipmentDto>;
  expositions: Array<ExpositionDto>;
  levels: Array<LevelDto>;
  regions: Array<RegionDto>;
  rockTypes: Array<RockTypeDto>;
  routeProfiles: Array<RouteProfileDto>;
}
