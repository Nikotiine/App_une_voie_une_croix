import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AppNotebook,
  AppNotebookService,
} from '../../../../core/app/services/app-notebook.service';
import {
  AchievementType,
  AchievementTypes,
} from '../../../../core/app/models/AchievementTypes.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../../core/app/config/toast.config';
import { RouteDto } from '../../../../core/api/models/route-dto';
import { LanguageService } from '../../../../core/app/services/language.service';

@Component({
  selector: 'app-notebook-form-dialog',
  templateUrl: './notebook-form-dialog.component.html',
  styleUrls: ['./notebook-form-dialog.component.scss'],
})
export class NotebookFormDialogComponent implements OnInit {
  @Input() visible: boolean;
  @Input() route: RouteDto;
  @Output() isClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();
  public achievementTypes: AchievementTypes[] = [];
  public form: FormGroup;
  constructor(
    private readonly appNotebookService: AppNotebookService,
    private readonly fb: FormBuilder,
    private readonly messageService: MessageService,
    private readonly languageService: LanguageService
  ) {
    this.achievementTypes = this.appNotebookService.achievementTypes();
    this.form = this.fb.group({
      trials: [1],
      achievement: [1],
      succeedAt: [new Date()],
      ranking: [0],
    });
  }

  ngOnInit(): void {
    this.watchTrial();
  }
  private watchTrial(): void {
    this.form.controls['trials'].valueChanges.subscribe({
      next: value => {
        if (value > 1) {
          this.form.controls['achievement'].setValue(3);
        }
      },
    });
    this.form.controls['achievement'].valueChanges.subscribe({
      next: value => {
        if (value === 1 || value === 2) {
          this.form.controls['trials'].setValue(1);
        }
      },
    });
  }

  public submit(): void {
    const notebook: AppNotebook = {
      route: this.route,
      succeedAt: this.form.controls['succeedAt'].value,
      trials: this.form.controls['trials'].value,
      achievementType: this.achievement,
      commentary: '',
      ranking: this.form.controls['ranking'].value,
    };
    this.appNotebookService.newNotebook(notebook).subscribe({
      next: res => {
        this.messageService.add({
          severity: ToastConfig.TYPE_SUCCESS,
          summary: this.languageService.toastTranslate(
            LanguageService.KEY_TOAST_NOTEBOOK
          ).summary,
          detail: this.languageService.toastTranslate(
            LanguageService.KEY_TOAST_NOTEBOOK
          ).create,
        });
        this.isSuccess.emit(true);
        this.closeDialog();
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: this.languageService.toastTranslate(
            LanguageService.KEY_TOAST_NOTEBOOK
          ).summary,
          detail: err.error.message,
        });
        this.closeDialog();
      },
    });
  }
  private get achievement(): AchievementType {
    const achievement = this.achievementTypes.find(
      a => a.value === this.form.controls['achievement'].value
    );
    return achievement.name;
  }
  public closeDialog(): void {
    this.isClose.emit((this.visible = !this.visible));
  }
}
