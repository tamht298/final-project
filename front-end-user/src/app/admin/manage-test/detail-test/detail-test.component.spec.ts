import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTestComponent } from './detail-test.component';

describe('DetailTestComponent', () => {
  let component: DetailTestComponent;
  let fixture: ComponentFixture<DetailTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
