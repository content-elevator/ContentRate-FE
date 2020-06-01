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

  getResult(jobId: number) {
    return this.http.get<Job>(`${this.baseUrl}/jobs/${jobId}`);
  }
}
