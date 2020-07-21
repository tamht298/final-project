import {Component, OnInit} from '@angular/core';
import {StatisticsService} from '../../_services/statistics.service';
import {Statistics} from '../../models/statistics';
import Chart from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  statistics: Statistics;
  lastSevenDays: any[] = [];

  constructor(private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.fetchStatistics();
  }

  fetchStatistics() {
    this.getLastSevenDays();
    this.statisticsService.getStatistics().subscribe(res => {
      this.statistics = res;
      console.log(this.statistics.examUserLastedSevenDaysTotal.shift());
      const config = {
        type: 'line',
        data: {
          labels: this.lastSevenDays,
          datasets: [
            {
              label: new Date().getFullYear(),
              backgroundColor: '#4c51bf',
              borderColor: '#4c51bf',
              data: this.statistics.examUserLastedSevenDaysTotal,
              fill: false
            }

          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: 'Exam Charts',
            fontColor: 'white',
          },
          legend: {
            labels: {
              fontColor: 'white'
            },
            align: 'end',
            position: 'bottom'
          },
          tooltips: {
            mode: 'index',
            intersect: false
          },
          hover: {
            mode: 'nearest',
            intersect: true
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  fontColor: 'rgba(255,255,255,.7)'
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: 'Month',
                  fontColor: 'white'
                },
                gridLines: {
                  display: false,
                  borderDash: [2],
                  borderDashOffset: [2],
                  color: 'rgba(33, 37, 41, 0.3)',
                  zeroLineColor: 'rgba(0, 0, 0, 0)',
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2]
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: 'rgba(255,255,255,.7)'
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: 'Value',
                  fontColor: 'white'
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: 'rgba(255, 255, 255, 0.15)',
                  zeroLineColor: 'rgba(33, 37, 41, 0)',
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2]
                }
              }
            ]
          }
        }
      };
      let ctx: any = document.getElementById('line-chart') as HTMLCanvasElement;
      ctx = ctx.getContext('2d');
      new Chart(ctx, config);
    });
  }
  getLastSevenDays() {
    let dayIndex = 0;
    while (dayIndex < 7) {
      this.lastSevenDays.push(moment().subtract(dayIndex, 'days').format('DD MMM'));
      dayIndex++;
    }

    console.log(this.lastSevenDays.reverse());
  }
}
