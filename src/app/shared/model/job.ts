import {JobStatus} from './job.status';
import {AnalysisResult} from './analysis.result';

export class Job {
  id: number;
  // tslint:disable-next-line:variable-name
  job_status: JobStatus;
  query: string;
  url: string;
  result: Array<AnalysisResult>;
}
