import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentialsDto } from '../../core/api/models/user-credentials-dto';
import { AuthService } from '../../core/api/services/auth.service';
import { SecurityService } from '../../core/app/services/security.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public registerUrl: string = '/auth/register';
  public form: FormGroup;
  private homeUrl:string ='/home'
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private securityService: SecurityService,
    private router:Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
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
          console.log(data);
          this.securityService.saveToken(data);
          return this.router.navigate([this.homeUrl])
        },
        error: err => {
          console.log(err);
        },
      });
  }
}
