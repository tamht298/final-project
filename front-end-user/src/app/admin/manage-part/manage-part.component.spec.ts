import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePartComponent } from './manage-part.component';

describe('ManagePartComponent', () => {
  let component: ManagePartComponent;
  let fixture: ComponentFixture<ManagePartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
