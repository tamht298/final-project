import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RichEditorComponent } from './rich-editor.component';

describe('RichEditorComponent', () => {
  let component: RichEditorComponent;
  let fixture: ComponentFixture<RichEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RichEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RichEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
