import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {UserService} from '../../shared/service/user.service';
import {first} from 'rxjs/operators';
import {User} from '../../shared/model/user';
import {BehaviorSubject} from 'rxjs';
import {UtilService} from '../../shared/service/util.service';

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
  private currentUserSubject: BehaviorSubject<User>;

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
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required],
    });

    this.userService.getUser().subscribe(result => {
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
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmitForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.update(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.utilService.createToastrSuccess('', 'Saved successfully');
          this.loading = false;
        },
        error => {
          this.utilService.createToastrError(error, 'ERROR');
          this.loading = false;
        });
  }

  onDeleteUser() {
    this.userService.deleteUser()
      .pipe(first())
      .subscribe(
        data => {
          this.utilService.createToastrSuccess('', 'User profile deleted successfully');
          this.loading = false;
          this.authenticationService.logout();
          this.router.navigate(['/login']);
        },
        error => {
          this.utilService.createToastrError(error, 'ERROR');
          this.loading = false;
        });
  }
}
