import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseCreateComponent } from './course-create.component';

describe('CourseCreateComponent', () => {
  let component: CourseCreateComponent;
  let fixture: ComponentFixture<CourseCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
