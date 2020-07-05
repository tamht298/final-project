import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultCircleComponent } from './result-circle.component';

describe('ResultCircleComponent', () => {
  let component: ResultCircleComponent;
  let fixture: ComponentFixture<ResultCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
