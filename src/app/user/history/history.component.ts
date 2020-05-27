import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/shared/service/historyService';

export interface HistoryModel {
  average_length: number,
  created_at: string;
  id: number;
  length: number;
  query: string;
  score: number;
  url: string;
  user_id: number;
}
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})

export class HistoryComponent implements OnInit {
  rows = [];
  history:HistoryModel[];


  constructor(private historyService: HistoryService) {
  }

  ngOnInit(): void {
    this.historyService.getHistory()
      .subscribe((data:HistoryModel[])=> {
        this.history = data["data"];
        console.log(data["data"])
      })
  } 
}