import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSkeletonComponent } from './table-skeleton.component';

describe('TableSkeletonComponent', () => {
  let component: TableSkeletonComponent;
  let fixture: ComponentFixture<TableSkeletonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSkeletonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
