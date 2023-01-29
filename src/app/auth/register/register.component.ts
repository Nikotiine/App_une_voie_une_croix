import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserRegisterDto } from '../../core/api/models/user-register-dto';
import { UserService } from '../../core/api/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public form: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      birthday: [''],
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
    console.log(user);
    this.userService
      .userControllerCreateUser({
        body: user,
      })
      .subscribe({
        next: data => {
          console.log(data);
        },
      });
  }
}
