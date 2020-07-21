import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreLoadingComponent } from './pre-loading.component';

describe('PreLoadingComponent', () => {
  let component: PreLoadingComponent;
  let fixture: ComponentFixture<PreLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
