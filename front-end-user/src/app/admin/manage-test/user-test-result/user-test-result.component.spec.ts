import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTestResultComponent } from './user-test-result.component';

describe('UserTestResultComponent', () => {
  let component: UserTestResultComponent;
  let fixture: ComponentFixture<UserTestResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTestResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTestResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
