import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegisterDto } from '../../../core/api/models/user-register-dto';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../../core/api/services/user.service';
import { AuthRoutingModule } from '../auth-routing.module';
import { ToastConfig } from '../../../core/app/config/toast.config';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public form: FormGroup;
  public loginUrl: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      birthday: ['', Validators.required],
    });
    this.loginUrl = AuthRoutingModule.LOGIN;
  }

  public submit(): void {
    const user: UserRegisterDto = {
      firstName: this.form.controls['firstName'].value,
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
            severity: ToastConfig.TYPE_SUCCESS,
            summary: ToastConfig.AUTH_SUMMARY,
            detail: ToastConfig.AUTH_REGISTER_DETAIL,
          });
          return this.router.navigate([this.loginUrl]);
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.AUTH_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }
}
