import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {UserService} from '../../shared/service/registration.service';
import {AlertService} from '../../shared/service/alert.service';
import {first} from 'rxjs/operators';
import {User} from '../../shared/model/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  registerForm: FormGroup;
  user: User;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required],
    });

    this.userService.getUser().subscribe(result => {
        console.log(result);
        this.user = result;
        this.registerForm = this.formBuilder.group({
        first_name: [this.user.first_name, Validators.required],
        last_name: [this.user.last_name, Validators.required],
        username: [this.user.username, Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
        email: [this.user.email, Validators.required]
      });
    });
    // console.log('returned user:' + this.user);
    // this.registerForm = this.formBuilder.group({
    //   first_name: [this.user.first_name, Validators.required],
    //   last_name: [this.user.last_name, Validators.required],
    //   username: [this.user.username, Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
    //   email: [this.user.email, Validators.required],
    // });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    console.log('pressed update user');
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log('before calling update user');
    this.loading = true;
    this.userService.update(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.alertService.success('Saved successfully', true);
          this.loading = false;
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}
