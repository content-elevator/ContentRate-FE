<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../shared/service/authentication.service';
import {UtilService} from '../shared/service/util.service';
=======
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../shared/service/util.service';
import {first} from 'rxjs/operators';
import {AnalysisService} from '../shared/service/analysis.service';
import {interval, Subscription} from 'rxjs';
import {AnalysisResult} from '../shared/model/analysis.result';
>>>>>>> master

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

<<<<<<< HEAD
  rateForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private utilService: UtilService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.rateForm = this.formBuilder.group({
      query: ['', Validators.required],
      url: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.rateForm.controls; }
=======
  analysisForm: FormGroup;
  step = 0;
  analysing = false;
  loading = false;
  submitted = false;
  analysisResult: AnalysisResult;

  constructor(
    private formBuilder: FormBuilder,
    private analysisService: AnalysisService,
    private utilService: UtilService
  ) {
  }

  ngOnInit(): void {
    this.analysisForm = this.formBuilder.group({
      url: ['', Validators.required],
      query: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.analysisForm.controls;
  }
>>>>>>> master

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
<<<<<<< HEAD
    if (this.rateForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.query.value, this.f.url.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
=======
    if (this.analysisForm.invalid) {
      return;
    }

    this.analysing = true;
    this.loading = true;

    this.analysisService.analyse(this.f.url.value, this.f.query.value)
      .pipe(first())
      .subscribe(
        job => {
          localStorage.setItem('jobId', job.jobId.toString());
          this.step = 1;
          const repeat = interval(3000);
          const subscription = repeat.subscribe(
            () => this.analysisService.getStatus(job.jobId)
              .pipe(first())
              .subscribe(
                update => this.updateStep(subscription, update.status, job.jobId)
              )
          );
          // tslint:disable-next-line:max-line-length
          setTimeout(() => {
            subscription.unsubscribe();
            this.utilService.createToastrError('Server didn\'t responded. Please try again.', 'ERROR');
            this.stopAnalysis();
          }, 180000);
>>>>>>> master
        },
        error => {
          this.loading = false;
        });
<<<<<<< HEAD
=======
  }

  private updateStep(subscription: Subscription, step: number, jobId: number) {
    this.step = step;
    if (this.step < 5) {
      this.step = this.step + 1;
    } else {
      this.utilService.createToastrSuccess('The serve completed the analysis', '');
      subscription.unsubscribe();
      this.stopAnalysis();
      this.analysisService.getResult(jobId)
        .pipe(first())
        .subscribe(
          result => {
            this.analysisResult = result;
          });
    }
  }

  private stopAnalysis() {
    this.loading = false;
    this.step = 0;
    this.analysing = false;
>>>>>>> master
  }

}
