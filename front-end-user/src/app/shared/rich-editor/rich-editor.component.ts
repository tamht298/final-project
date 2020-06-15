import {Component, Input, OnInit, ViewChild} from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import {ChangeEvent, CKEditorComponent} from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-rich-editor',
  templateUrl: './rich-editor.component.html',
  styleUrls: ['./rich-editor.component.scss']
})
export class RichEditorComponent implements OnInit {

  Editor = BalloonEditor;
  editorConfig = {
    placeholder: 'Nhập nội dung!',
  };
  text = '';

  constructor() {

  }

  ngOnInit(): void {

  }

  onChange({editor}: ChangeEvent) {
    // const data = editor.getData();
  }
}
