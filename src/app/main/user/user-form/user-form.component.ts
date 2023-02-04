import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/api/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegisterDto } from '../../../core/api/models/user-register-dto';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  public formNewPassword: FormGroup;
  displayDialog: boolean = false;
  private userId: number = 0;
  private userEmail: string = '';
  private toastSummary: string = 'Profil utlisateur';
  private toastDetail: string = 'Mise a jour reussie';
  private userProfileUrl: string = '/user/profile';
  private timeout: number = 2000;
  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthday: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.formNewPassword = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.userId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getProfile();
  }

  submit() {
    const editUserProfile: UserRegisterDto = {
      firstName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      password: this.form.controls['password'].value,
      birthday: this.form.controls['birthday'].value,
      email: this.userEmail,
    };
    this.userService
      .userControllerEditUser({
        id: this.userId,
        body: editUserProfile,
      })
      .subscribe({
        next: data => {
          this.messageService.add({
            severity: 'success',
            summary: this.toastSummary,
            detail: this.toastDetail,
          });
          return this.router.navigate([this.userProfileUrl]);
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: this.toastSummary,
            detail: err.error.message,
          });
          this.form.controls['password'].setValue('');
        },
      });
  }

  private getProfile() {
    this.userService
      .userControllerGetUser({
        id: this.userId,
      })
      .subscribe({
        next: data => {
          this.form.controls['firstName'].setValue(data.firstName);
          this.form.controls['lastName'].setValue(data.lastName);
          const birthday = new Date(data.birthday);
          this.form.controls['birthday'].setValue(birthday);
          this.userEmail = data.email;
        },
        error: err => {
          if (err.status === 401) {
            this.router.navigate([err.statusText.toLowerCase()]);
          }
        },
      });
  }

  public showDialog(): void {
    this.displayDialog = !this.displayDialog;
  }

  submitNewPassword() {}
}
