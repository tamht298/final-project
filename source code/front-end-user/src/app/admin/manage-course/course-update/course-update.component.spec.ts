import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseUpdateComponent } from './course-update.component';

describe('CourseUpdateComponent', () => {
  let component: CourseUpdateComponent;
  let fixture: ComponentFixture<CourseUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
