import { Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output } from '@angular/core';

@Component({
  selector: 'rich-text-field',
  templateUrl: './rich-text-field.component.html',
  styleUrls: ['./rich-text-field.component.css']
})

export class RichTextFieldComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: string = 'rich-editor';
  @Input() content: string = '';
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor: any;
  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      skin_url: '/assets/skins/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    }).then(editors => {
      if (editors[0]) {
        editors[0].setContent(this.content, { format: 'raw' });
      }
    });
  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
