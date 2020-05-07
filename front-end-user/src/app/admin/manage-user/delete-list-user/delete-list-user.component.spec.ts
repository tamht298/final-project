import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteListUserComponent } from './delete-list-user.component';

describe('DeleteListUserComponent', () => {
  let component: DeleteListUserComponent;
  let fixture: ComponentFixture<DeleteListUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteListUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
