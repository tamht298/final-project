import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels, ApexFill,
  ApexPlotOptions, ApexResponsive,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import {CoursePoint} from '../../models/course-point';
import {ChartService} from '../../_services/chart.service';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xAxis: ApexXAxis;
  fill: ApexFill;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})


export class StatisticsComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  coursePointData: CoursePoint[];

  constructor(private chartService: ChartService) {
  }

  ngOnInit(): void {
    this.getCoursePoint();
  }

  getCoursePoint() {
    this.chartService.getCoursePoint().subscribe(res => {
      this.coursePointData = res;
      console.log(this.coursePointData);
      this.chartOptions = {
        series: [
          {
            name: 'Average Point',
            data: this.coursePointData.map(item => item.totalPoint),

          }
        ],
        chart: {
          type: 'bar',
          height: 400,
          zoom: {
            enabled: true,
            type: 'x',
            autoScaleYaxis: false,
            zoomedArea: {
              fill: {
                color: '#90CAF9',
                opacity: 0.4
              },
              stroke: {
                color: '#0D47A1',
                opacity: 0.4,
                width: 1
              }
            }
          },
          dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.35
          }
        },
        title: {
          text: 'Statistics of courses',
          align: 'center',
          style: {
            color: '#444',
            fontSize: '24px'
          }
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        dataLabels: {
          enabled: true,
          formatter(val) {
            if (val) {
            return val + ' point';
            }
          },
          offsetX: -20,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        xAxis: {
          categories: this.coursePointData.map(item => item.courseName),
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.1,
                opacityTo: 1
              }
            }
          },
          tooltip: {
            enabled: false,
            offsetY: -35
          },
          labels: {
            show: true,
            formatter(val) {
              return val + ' point';
            }
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'light',
            type: 'horizontal',
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: false,
            opacityFrom: 0.8,
            opacityTo: 1,
            stops: [20, 40, 60, 80]
          }
        }
      };
    });
  }

}
