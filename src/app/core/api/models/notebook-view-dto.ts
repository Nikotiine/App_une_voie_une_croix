/* tslint:disable */
/* eslint-disable */
import { RouteViewDto } from './route-view-dto';
import { UserProfileDto } from './user-profile-dto';
export interface NotebookViewDto {
  achievementType: 'A Vue' | 'Flash' | 'Travail';
  commentary: string;
  id: number;
  ranking: null | number;
  route: RouteViewDto;
  succeedAt: null | string;
  trials: number;
  user: UserProfileDto;
}
