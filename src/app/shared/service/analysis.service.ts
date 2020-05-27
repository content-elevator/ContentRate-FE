import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Job} from '../model/job';
import {interval, Observable} from 'rxjs';
import {AnalysisResult} from '../model/analysis.result';

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class AnalysisService {

  private baseUrl = 'https://analysis-service.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  analyse(url: string, query: string) {
    // TODO: delete
    // tslint:disable-next-line:variable-name
    const user_id = 0;
    return this.http.post<Job>(`${this.baseUrl}/jobs/`, {user_id, url, query});
  }

  getStatus(jobId: number) {
    return this.http.get<Job>(`${this.baseUrl}/jobs/${jobId}`);
  }

  getResult(jobId: number) {
    const params = new HttpParams()
      .set('jobID', jobId.toString());
    return this.http.get<AnalysisResult>(`${this.baseUrl}/blablabla/`, {params});
  }
}
