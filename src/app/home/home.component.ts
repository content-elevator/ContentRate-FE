import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilService} from '../shared/service/util.service';
import {first} from 'rxjs/operators';
import {AnalysisService} from '../shared/service/analysis.service';
import {interval, Subscription} from 'rxjs';
import {AnalysisResult} from '../shared/model/analysis.result';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
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
        },
        error => {
          this.loading = false;
        });
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
  }

}
