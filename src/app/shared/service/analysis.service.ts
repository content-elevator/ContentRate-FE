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

  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {
  }

  analyse(url: string, query: string) {
    const params = new HttpParams()
      .set('url', url)
      .set('query', query);
    return this.http.get<Job>(`${this.baseUrl}/blablabla/`, {params});
  }

  getStatus(jobId: number) {
    const params = new HttpParams()
      .set('jobID', jobId.toString());
    return this.http.get<Job>(`${this.baseUrl}/blablabla/`, {params});
  }

  getResult(jobId: number) {
    const params = new HttpParams()
      .set('jobID', jobId.toString());
    return this.http.get<AnalysisResult>(`${this.baseUrl}/blablabla/`, {params});
  }
}
