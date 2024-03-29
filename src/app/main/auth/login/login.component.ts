import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentialsDto } from '../../../core/api/models/user-credentials-dto';
import { AuthService } from '../../../core/api/services/auth.service';
import { SecurityService } from '../../../core/app/services/security.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { MainRoutingModule } from '../../main-routing.module';
import { AuthRoutingModule } from '../auth-routing.module';
import { mergeMap } from 'rxjs';
import { UserProfileService } from '../../../core/app/services/user-profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public registerUrl: string;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly securityService: SecurityService,
    private messageService: MessageService,
    private userProfileService: UserProfileService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.registerUrl = AuthRoutingModule.REGISTER;
  }

  public submit(): void {
    const credentials: UserCredentialsDto = {
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
    };

    this.authService
      .authControllerLogin({
        body: credentials,
      })
      .pipe(
        mergeMap(token => {
          this.securityService.saveToken(token);
          return this.authService.authControllerMe();
        })
      )
      .subscribe({
        next: data => {
          this.userProfileService.setUserProfile(data);
          return this.router.navigate([MainRoutingModule.HOME]);
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
