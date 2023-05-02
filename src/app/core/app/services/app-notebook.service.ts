import { Injectable } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { NotebookService } from '../../api/services/notebook.service';
import {
  AchievementType,
  AchievementTypes,
} from '../models/AchievementTypes.model';
import { RouteDto } from '../../api/models/route-dto';
import { Observable } from 'rxjs';
import { NotebookCreateDto } from '../../api/models/notebook-create-dto';
import { NotebookViewDto } from '../../api/models/notebook-view-dto';

export interface AppNotebook {
  trials: number;
  route: RouteDto;
  commentary: string;
  succeedAt: string;
  achievementType: AchievementType;
  ranking: number;
}

@Injectable({
  providedIn: 'root',
})
export class AppNotebookService {
  private types: AchievementTypes[] = [
    { name: AchievementType.A_VUE, value: 1 },
    { name: AchievementType.FLASH, value: 2 },
    { name: AchievementType.TRAVAIL, value: 3 },
  ];

  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly notebookService: NotebookService
  ) {}
  public achievementTypes(): AchievementTypes[] {
    return this.types;
  }
  public newNotebook(notebook: AppNotebook): Observable<NotebookViewDto> {
    const notebookCreateDto: NotebookCreateDto = {
      user: this.userProfileService.getUserProfile(),
      ...notebook,
    };
    return this.notebookService.notebookControllerCreateNewNotebook({
      body: notebookCreateDto,
    });
  }

  public getMyNotebook(): Observable<NotebookViewDto[]> {
    return this.notebookService.notebookControllerGetNotebooks({
      id: this.userProfileService.getUserProfile().id,
    });
  }
}
