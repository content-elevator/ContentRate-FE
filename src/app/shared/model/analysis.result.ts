import {Tfidf} from './tfidf';

export class AnalysisResult {
  // tslint:disable-next-line:variable-name
  word_count_user: number;
  // tslint:disable-next-line:variable-name
  word_count_google: number;
  // tslint:disable-next-line:variable-name
  tfidf_general_score: number;
  // tslint:disable-next-line:variable-name
  analysis_instance: number;
  // tslint:disable-next-line:variable-name
  tfidf_results: Array<Tfidf>;
}
