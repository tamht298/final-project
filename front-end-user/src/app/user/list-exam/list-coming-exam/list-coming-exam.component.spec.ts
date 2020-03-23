import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComingExamComponent } from './list-coming-exam.component';

describe('ListComingExamComponent', () => {
  let component: ListComingExamComponent;
  let fixture: ComponentFixture<ListComingExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComingExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComingExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
