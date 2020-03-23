import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompleteExamComponent } from './list-complete-exam.component';

describe('ListCompleteExamComponent', () => {
  let component: ListCompleteExamComponent;
  let fixture: ComponentFixture<ListCompleteExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCompleteExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompleteExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
