import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component, ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CalendarOptions, FullCalendarComponent} from '@fullcalendar/angular';
import * as moment from 'moment';
import {ExamService} from '../../_services/exam.service';
import {ExamCalendar} from '../../models/exam-calendar';
import {ToastrService} from 'ngx-toastr';

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
  initialView = 'dayGridMonth';
  calendarOptions: CalendarOptions;
  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  examEventDetail = false;
  examDetail: ExamCalendar;

  constructor(
    private examService: ExamService,
    private toast: ToastrService) {
  }

  ngOnInit(): void {
    this.getExamList();
  }

  ngAfterViewInit(): void {
    this.calendarApi = this.calendarComponent.getApi();
  }

  ngAfterContentChecked(): void {
    this.nowDate = moment(this.calendarApi?.getDate()).format('MMMM, yyyy');

  }

  getExamList() {
    this.calendarOptions = {
      initialDate: new Date(),
      initialView: this.initialView,
      headerToolbar: {
        left: '',
        right: '',
        center: ''
      },
      events: this.examEvents,
      eventClick: this.handleEventClick.bind(this),
      timeZone: 'Asia/Ho_Chi_Minh',

    };

    this.examService.getExamCalendar().subscribe(res => {
      this.examCalendars = res;
      console.log(this.examCalendars);
      this.examCalendars.forEach(value => {
        switch (value.isCompleted) {
          case -2: {
            this.examEvents.push({groupId: value.examId.toString(), title: value.courseCode, start: value.beginDate, end: value.finishDate, color: '#F56565'});

            break;
          }
          case -1: {
            this.examEvents.push({groupId: value.examId.toString(), title: value.courseCode, start: value.beginDate, end: value.finishDate, color: '#A0AEC0'});
            break;
          }
          case 0: {
            this.examEvents.push({groupId: value.examId.toString(), title: value.courseCode, start: value.beginDate, end: value.finishDate, color: '#ECC94B'});
            break;
          }
          case 1: {
            this.examEvents.push({groupId: value.examId.toString(), title: value.courseCode, start: value.beginDate, end: value.finishDate, color: '#48BB78'});

            break;
          }
        }
      });
    }, error => {
      this.toast.error(error, 'Error');
    });
  }

  handleEventClick(calEvent) {
    const examId = calEvent.event._def.groupId;
    this.examDetail = this.examCalendars.find(item => Number(item.examId) === Number(examId));
    this.examEventDetail = true;
  }

  goToday() {
    this.calendarApi.gotoDate(new Date());

  }

  goNextMonth() {
    this.calendarApi.next();
  }


  goPrevMonth() {
    this.calendarApi.prev();
  }


  closeModal() {
    this.examEventDetail = false;
  }

}
