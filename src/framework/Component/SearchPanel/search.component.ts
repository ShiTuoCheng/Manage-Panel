/*
  苏成闯
  组件 - 搜索面板
*/

import { Component, Input, EventEmitter } from '@angular/core';
import { animate, trigger, state, style, transition, keyframes } from '@angular/animations';


export interface SearchPanelHooks {
  open?;
  close?;
}

@Component({
  selector: 'g-search-panel',
  templateUrl: './search.component.html'
})
export class SearchPanelComponent {
  @Input() hooks: SearchPanelHooks;

  private isOpen: boolean;

  open() {
    this.isOpen = true;

    this.hooks.open && this.hooks.open();
  }

  close() {
    this.isOpen = false;

    this.hooks.close && this.hooks.close();
  }
}
