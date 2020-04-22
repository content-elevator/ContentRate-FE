import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {UserService} from '../../shared/service/user.service';
import {first} from 'rxjs/operators';
import {User} from '../../shared/model/user';
import {UtilService} from '../../shared/service/util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  registerForm: FormGroup;
  changePasswordForm: FormGroup;
  user: User;
  loading = false;
  submitted = false;
  submittedChangePassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.changePasswordForm = this.formBuilder.group({
      old_password: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.userService.getUser().subscribe(result => {
        this.user = result;
        this.registerForm = this.formBuilder.group({
        first_name: [this.user.first_name, Validators.required],
        last_name: [this.user.last_name, Validators.required],
        username: [this.user.username, Validators.required],
        email: [this.user.email, Validators.required]
      });
    });
  }

  // convenience getter for easy access to form fields
  get f1() { return this.registerForm.controls; }
  get f2() { return this.changePasswordForm.controls; }

  onSubmitEditProfileForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.update(this.registerForm.value)
      .pipe(first())
      .subscribe(
        () => {
          this.utilService.createToastrSuccess('', 'Saved successfully');
        });
    this.loading = false;
  }

  onDeleteUser() {
    this.userService.deleteUser()
      .pipe(first())
      .subscribe(
        () => {
          this.utilService.createToastrSuccess('', 'User profile deleted successfully');
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        });
    this.loading = false;
  }

  onSubmitChangePasswordForm() {
    this.submittedChangePassword = true;

    // stop here if form is invalid
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.updatePassword(this.changePasswordForm.value.old_password,
      this.changePasswordForm.value.password, this.changePasswordForm.value.password_confirmation)
      .pipe(first())
      .subscribe(
        () => {
          this.utilService.createToastrSuccess('', 'New password saved successfully');
        });
    this.loading = false;
    this.changePasswordForm.reset();
    this.submittedChangePassword = false;
  }
}
