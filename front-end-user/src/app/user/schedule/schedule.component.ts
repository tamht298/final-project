import {AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import * as moment from 'moment';
import {ExamService} from '../../_services/exam.service';
import {ExamCalendar} from '../../models/exam-calendar';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, AfterViewInit, AfterContentChecked {
  calendarApi;
  nowDate: string;
  examCalendars: ExamCalendar[] = [];
  examEvents: any[] = [];
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialDate: new Date(),
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: '',
      right: '',
      center: ''
    },
    events: this.examEvents,
    eventClick: this.handleEventClick.bind(this),
    timeZone: 'Asia/Ho_Chi_Minh',

  };

  constructor(private examService: ExamService) {
  }

  ngOnInit(): void {
    this.getExamList();
  }

  getExamList() {
    this.examService.getExamCalendar().subscribe(res => {
      this.examCalendars = res;
      console.log(res);
      this.examCalendars.forEach(value => {
        if (value.isCompleted === true) {
          this.examEvents.push({groupId: value.examId.toString(), title: value.examTitle, date: value.beginDate, color: '#A0AEC0'});
        } else {
          this.examEvents.push({groupId: value.examId.toString(), title: value.examTitle, date: value.beginDate, color: '#48BB78'});

        }
      });
    });
  }

  handleEventClick(calEvent) {
    console.log(calEvent.event._def);
  }

  goToday() {
    this.calendarApi.gotoDate(new Date());

  }

  goNextMonth() {
    this.calendarApi.next();
  }

  ngAfterContentChecked(): void {
    this.nowDate = moment(this.calendarApi?.getDate()).format('MMMM yyyy');

  }

  goPrevMonth() {
    this.calendarApi.prev();
  }

  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
  }

}
