/* tslint:disable */
/* eslint-disable */
import { RouteDto } from './route-dto';
import { UserProfileDto } from './user-profile-dto';
export interface NotebookViewDto {
  commentary: string;
  id: number;
  route: RouteDto;
  succeedAt: null | string;
  trials: number;
  user: UserProfileDto;
}
