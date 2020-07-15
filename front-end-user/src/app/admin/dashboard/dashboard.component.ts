import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '../../_services/statistics.service';
import {Statistics} from '../../models/statistics';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  statistics: Statistics;

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.statisticsService.getStatistics().subscribe(res => {
      this.statistics = res;
      console.log(this.statistics);
    });
  }

}
