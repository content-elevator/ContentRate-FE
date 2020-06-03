import {Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke
} from 'ng-apexcharts';
import {Job} from '../shared/model/job';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
};
@Component({
  selector: 'diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnChanges{

  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @Input() analysisResult: Job;
  wcGoogle: number;
  wcUser: number;
  tfidfScore: number;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'google_score',
          data: []
        },
        {
          name: 'your_score',

          data: []
        }
      ],
      chart: {
        type: 'bar',
        height: 1500
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        offsetX: -6,
        style: {
          fontSize: '12px',
          colors: ['#fff']
        }
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: []
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {

    // this.doSomething(changes.analysisResult.currentValue);
    this.analysisResult = changes.analysisResult.currentValue;
    if (this.analysisResult) {
      const googleResultList = this.analysisResult.result[0].tfidf_results.map(r => Math.round(r.google_score * 100));
      const userResultList = this.analysisResult.result[0].tfidf_results.map(r => Math.round(r.user_score * 100));
      const wordList = this.analysisResult.result[0].tfidf_results.map(r => r.word);

      this.wcGoogle = this.analysisResult.result[0].word_count_google;
      this.wcUser = this.analysisResult.result[0].word_count_user;
      this.tfidfScore = Math.round(this.analysisResult.result[0].tfidf_general_score * 100);
      // You can also use categoryId.previousValue and
      // categoryId.firstChange for comparing old and new values

      this.chartOptions = {
        series: [
          {
            name: 'google_score',
            data: googleResultList
          },
          {
            name: 'your_score',

            data: userResultList
          }
        ],
        chart: {
          type: 'bar',
          height: 1500
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: wordList
        }
      };
    }
  }
}

