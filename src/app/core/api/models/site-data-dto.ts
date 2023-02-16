/* tslint:disable */
/* eslint-disable */
import { ApproachTypeDto } from './approach-type-dto';
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { ExpositionsDto } from './expositions-dto';
import { LevelsDto } from './levels-dto';
import { RegionDto } from './region-dto';
import { RockTypeDto } from './rock-type-dto';
import { RouteProfileDto } from './route-profile-dto';
export interface SiteDataDto {
  approachTypes: Array<ApproachTypeDto>;
  engagements: Array<EngagementDto>;
  equipments: Array<EquipmentDto>;
  expositions: Array<ExpositionsDto>;
  levels: Array<LevelsDto>;
  regions: Array<RegionDto>;
  rockTypes: Array<RockTypeDto>;
  routeProfiles: Array<RouteProfileDto>;
}
