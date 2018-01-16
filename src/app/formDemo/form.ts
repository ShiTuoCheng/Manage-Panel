/*
  scc
  Form Demo 页
*/

import { Component, OnInit } from '@angular/core';
import { GTabServer } from '@app/index/index';


@Component({
  selector: 'form-demo',
  templateUrl: './form.html'
})
export class FromDemoComponent implements OnInit {

  // 表单选择列表数据结构
  public formList = [{ 'fuck1': '测试1' }, '测试2', 3, { 'fuck4': '测试4' }, '测试5', 66];

  // 表单的placeholder
  public placeholder = "我是placeholder";
  private anotherPlaceholder = "另一个palceholder";

  // 默认selected值
  public shit = '下拉默认值';

  // private test = new TabsComponent();

  // 编辑器
  editorContent = "编辑器初始化";
  elementId = "test";
  // 编辑器配置
  private option = {

  };

  constructor(private gTab: GTabServer) {
    this.gTab = this.gTab.obj;
  }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.editorContent, this.shit, this.gTab);
    }, 5000);
  }

  testfuc1(event) {
    console.log(event, 'fuc1');
  }

  testfuc2(event) {
    console.log(event, 'fuc2');
  }

  editorFun(data) {
    console.log(data);
  }
}
