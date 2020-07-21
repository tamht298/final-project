import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAvatarComponent } from './update-avatar.component';

describe('UpdateAvatarComponent', () => {
  let component: UpdateAvatarComponent;
  let fixture: ComponentFixture<UpdateAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
