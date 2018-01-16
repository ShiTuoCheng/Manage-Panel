/*
    shituocheng
    编辑器组件
*/

import {
  AfterViewInit, Component, ElementRef, forwardRef, Input, NgZone, OnDestroy,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

declare let tinymce: any;
declare let $: any;

export const TINYMCE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => EditorComponent),
  multi: true
};

@Component({
  selector: 'app-comm-editor',
  templateUrl: './editor.component.html',
  providers: [TINYMCE_VALUE_ACCESSOR]
})
export class EditorComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() elementId: String;

  @ViewChild('textArea') textArea: ElementRef;

  editor: any;
  value: string;

  onChange = (_: any) => { console.log(_); };

  constructor(private zone: NgZone) {}

  writeValue(value: any): void {
    this.value = value;
    if (this.editor) {
        setTimeout(() => this.editor.setContent(value), 500);
    }
  }

    ngAfterViewInit() {
        tinymce.init({
            target: this.textArea.nativeElement,
            toolbar: "undo redo | styleselect | bold italic | imageupload | preview | table",
            height: 170,
            plugins: ['link', 'paste', 'table', 'imagetools', 'print', 'preview', 'image'],
            language_url: '../../../assets/langs/zh_CN.js',  // site absolute URL
            skin_url: 'assets/skins/lightgray',
            setup: editor => {
                this.editor = editor;
                this.initImageUpload(editor);
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    // console.log(this.zone.current.name);
                    this.zone.run(() => this.onChange(content));
                });
            }
        });
    }

    initImageUpload(editor) {

        const inp = $('<input id="tinymce-uploader" type="file" name="pic" accept="image/*" style="display:none">');
        $(editor.getElement()).parent().append(inp);

        editor.addButton('imageupload', {
            text: '',
            icon: 'image',
            onclick: (e) => { // when toolbar button is clicked, open file select modal
                inp.trigger('click');
            }
        });

        inp.on("change", (e) => {
            this.uploadFile(inp, editor);
        });
    }

    uploadFile(inp, editor) {
        const input = inp.get(0);
        const data = new FormData();
        data.append('image[file]', input.files[0]);

        $.ajax({
            url: '/admin/images',
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
            success: (data, textStatus, jqXHR) => {
                editor.insertContent('<img class="content-img" src="' + data.url + '"/>');
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log('发送失败');
            }
        });
    }

    registerOnChange(fn: (_: any) => void): void { this.onChange = fn; }

  registerOnTouched(fn: () => void): void { }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
