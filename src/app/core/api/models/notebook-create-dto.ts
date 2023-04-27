/* tslint:disable */
/* eslint-disable */
import { RouteViewDto } from './route-view-dto';
import { UserProfileDto } from './user-profile-dto';
export interface NotebookCreateDto {
  achievementType: 'A Vue' | 'Flash' | 'Travail';
  commentary: string;
  route: RouteViewDto;
  succeedAt: null | string;
  trials: number;
  user: UserProfileDto;
}
