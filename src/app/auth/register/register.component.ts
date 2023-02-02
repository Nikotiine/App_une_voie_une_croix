import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterDto } from '../../core/api/models/user-register-dto';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../core/api/services/auth.service';
import {UserService} from "../../core/api/services/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public form: FormGroup;
  //private attribute
  private toastSummary: string = "Service d'inscription";
  private toastDetail: string = 'Inscritption validée';
  private loginUrl: string = '/auth/login';
  private timeout: number = 2000;
  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthday: ['', Validators.required],
    });
  }

  public submit(): void {
    const user: UserRegisterDto = {
      fistName: this.form.controls['firstName'].value,
      lastName: this.form.controls['lastName'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      birthday: this.form.controls['birthday'].value,
    };
    this.userService
      .userControllerCreateUser({
        body: user,
      })
      .subscribe({
        next: data => {
          this.messageService.add({
            severity: 'success',
            summary: this.toastSummary,
            detail: this.toastDetail,
          });
          setTimeout(() => {
            return this.router.navigate([this.loginUrl]);
          }, this.timeout);
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: this.toastSummary,
            detail: err.error.message,
          });
        },
      });
  }
}
