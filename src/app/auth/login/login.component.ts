import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentialsDto } from '../../core/api/models/user-credentials-dto';
import { AuthService } from '../../core/api/services/auth.service';
import { SecurityService } from '../../core/app/services/security.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public registerUrl: string = '/auth/register';
  public form: FormGroup;
  private homeUrl: string = '/home';
  private toastSummary: string = 'Connexion';
  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly securityService: SecurityService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
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
      .subscribe({
        next: data => {
          this.securityService.saveToken(data);
          return this.router.navigate([this.homeUrl]);
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
