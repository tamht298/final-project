import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCardExamComponent } from './stat-card-exam.component';

describe('StatCardExamComponent', () => {
  let component: StatCardExamComponent;
  let fixture: ComponentFixture<StatCardExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatCardExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatCardExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
