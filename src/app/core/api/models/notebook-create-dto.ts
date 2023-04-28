/* tslint:disable */
/* eslint-disable */
import { RouteDto } from './route-dto';
import { UserProfileDto } from './user-profile-dto';
export interface NotebookCreateDto {
  achievementType: 'A Vue' | 'Flash' | 'Travail';
  commentary: string;
  route: RouteDto;
  succeedAt: null | string;
  trials: number;
  user: UserProfileDto;
}
