import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStatsComponent } from './card-stats.component';

describe('CardStatsComponent', () => {
  let component: CardStatsComponent;
  let fixture: ComponentFixture<CardStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
