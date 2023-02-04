import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../core/api/services/auth.service';
import { UserService } from '../../../core/api/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  public form: FormGroup;
  private userId: number = 0;
  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      birthday: [''],
      password: [''],
    });
  }
  ngOnInit(): void {
    this.userId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.getProfile();
  }

  submit() {}

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
        },
        error: err => {
          console.log(err);
        },
      });
  }
}
