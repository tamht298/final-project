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
    this.nowDate = moment(this.calendarApi?.getDate()).format('MMMM yyyy');

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
      console.log(res);
      this.examCalendars.forEach(value => {
        if (value.completed === true) {
          this.examEvents.push({groupId: value.examId.toString(), title: value.courseCode, date: value.beginDate, color: '#A0AEC0'});
        } else {
          this.examEvents.push({groupId: value.examId.toString(), title: value.courseCode, date: value.beginDate, color: '#48BB78'});

        }
      });
    }, error => {
      this.toast.error(error, 'Error');
    });
  }

  handleEventClick(calEvent) {
    console.log(calEvent.event._def);
    const examId = calEvent.event._def.groupId;
    this.examDetail = this.examCalendars.find(item => Number(item.examId) === Number(examId));
    console.log(this.examDetail);
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
