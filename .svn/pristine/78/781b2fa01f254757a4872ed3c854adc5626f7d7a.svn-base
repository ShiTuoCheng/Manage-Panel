/*
  苏成闯
  组件 - 拉菜单 Mini 版
*/

import { FormSelectorComponent } from './selector.component';
import { Component, forwardRef, NgZone, Input, OnInit, Pipe, PipeTransform, ElementRef, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';
import { animate, trigger, state, style, transition, keyframes } from '@angular/animations';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const optionItemHig = 30; // 组件 option 高度 用于展开选择列表时的动画用

@Component({
  selector: 'g-selector-mini',
  templateUrl: './selectorB.component.html',
  styleUrls: ['./selectorB.component.less'],
  animations: [
    trigger('expand', [
      state('true', style({
        height: '*'
      }))
    ])
  ]
})
export class SelectorMiniComponent extends FormSelectorComponent implements OnInit {
  ngOnInit(): void {
    super.checkLegalSetDefault();
  }

  // 实现展开动画 算取列表高度 Angular 动画的 * 太难用了
  expandAnime(ev) {
    let el = ev.element,
      item = el.querySelectorAll('li');

    el.style.height = item.length * optionItemHig + 'px';
  }

  formListClick(index) {
    // 点中第一项的话 退出
    if (!index)
      return;

    super.formListClick(index); // 调用父方法

    // 移动选中项到第一项
    const tarItem = this.optionList.splice(index, 1),
      newList = [tarItem[0], ...this.optionList];

    this.optionList = newList; // 直接操作 this.optionList ngFor 不跟着更新 不造为什么 这里用了个折中方案
  }
}
