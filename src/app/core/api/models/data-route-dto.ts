/* tslint:disable */
/* eslint-disable */
import { EngagementDto } from './engagement-dto';
import { EquipmentDto } from './equipment-dto';
import { ExpositionDto } from './exposition-dto';
import { LevelDto } from './level-dto';
import { RouteProfileDto } from './route-profile-dto';
export interface DataRouteDto {
  engagements: Array<EngagementDto>;
  equipments: Array<EquipmentDto>;
  expositions: Array<ExpositionDto>;
  levels: Array<LevelDto>;
  routeProfiles: Array<RouteProfileDto>;
}
