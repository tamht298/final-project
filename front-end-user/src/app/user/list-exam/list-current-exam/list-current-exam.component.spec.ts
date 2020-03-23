import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCurrentExamComponent } from './list-current-exam.component';

describe('ListCurrentExamComponent', () => {
  let component: ListCurrentExamComponent;
  let fixture: ComponentFixture<ListCurrentExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCurrentExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCurrentExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
